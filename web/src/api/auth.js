import api from './axios'

export async function register({ name, email, password }){
  const { data } = await api.post('/auth/register', { name, email, password })
  if (data?.token && typeof window!=='undefined') localStorage.setItem('access_token', data.token)
  return data
}

export async function login({ email, password }){
  const { data } = await api.post('/auth/login', { email, password })
  if (data?.token && typeof window!=='undefined') localStorage.setItem('access_token', data.token)
  return data
}

export async function logout(){
  try {
    await api.post('/auth/logout')
  } catch (e) {
    // Continue with logout even if API call fails
  }
  if (typeof window!=='undefined') {
    localStorage.removeItem('access_token')
    sessionStorage.removeItem('user_data')
  }
}
