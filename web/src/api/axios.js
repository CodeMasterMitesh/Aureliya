import axios from 'axios'

// In-memory CSRF token cache
let csrfToken = null
export function setCsrfToken(token){ csrfToken = token }
export function getCsrfToken(){ return csrfToken }

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',
  withCredentials: true, // send cookies for auth & csrf session
})

instance.interceptors.request.use((config)=>{
  // Attach CSRF token for unsafe methods when available
  if (csrfToken && ['post','put','patch','delete'].includes(config.method)) {
    config.headers['x-csrf-token'] = csrfToken
  }
  return config
})

// Normalize plain text error bodies (e.g., Express default "Cannot GET ...")
instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response && typeof err.response.data === 'string') {
      err.response.data = { error: err.response.data }
    }
    return Promise.reject(err)
  }
)

export default instance
