import axios from 'axios'

// In-memory CSRF token cache & in-flight promise
let csrfToken = null
let csrfPromise = null
export function setCsrfToken(token){ csrfToken = token }
export function getCsrfToken(){ return csrfToken }

function readCookie(name){
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : null
}

async function fetchCsrf(){
  // Avoid duplicate parallel fetches
  if (csrfToken) return csrfToken
  if (csrfPromise) return csrfPromise
  const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1', withCredentials: true })
  csrfPromise = client.get('/csrf')
    .then(r => {
      const t = r?.data?.csrfToken
      if (t) setCsrfToken(t)
      return t
    })
    .catch(()=>null)
    .finally(()=>{ csrfPromise = null })
  return csrfPromise
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',
  withCredentials: true, // send cookies for auth & csrf session
})

instance.interceptors.request.use(async (config)=>{
  const method = (config.method||'').toLowerCase()
  if (['post','put','patch','delete'].includes(method)){
    if (!csrfToken){
      // Try cookie first to avoid extra /csrf call
      const cookieToken = readCookie('XSRF-TOKEN')
      if (cookieToken) csrfToken = cookieToken
    }
    if (!csrfToken) await fetchCsrf()
    if (csrfToken){
      config.headers['x-csrf-token'] = csrfToken
      config.headers['x-xsrf-token'] = csrfToken // alternate header name supported by csurf
    }
  }
  return config
})

// Normalize plain text error bodies & auto-retry once on CSRF failure
instance.interceptors.response.use(
  res => res,
  async err => {
    const { response, config } = err
    if (response && typeof response.data === 'string') {
      response.data = { error: response.data }
    }
    const code = response?.data?.error?.code || response?.data?.code
    if (code === 'EBADCSRFTOKEN' && !config._csrfRetried){
      await fetchCsrf()
      const retryConfig = { ...config, _csrfRetried: true }
      if (csrfToken) retryConfig.headers = { ...(retryConfig.headers||{}), 'x-csrf-token': csrfToken }
      try { return await instance.request(retryConfig) } catch (e){ return Promise.reject(e) }
    }
    return Promise.reject(err)
  }
)

export default instance
export { fetchCsrf }
