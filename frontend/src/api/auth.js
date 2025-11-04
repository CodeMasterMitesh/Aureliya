import api from './axios'

export async function register({ name, email, password }){
  const { data } = await api.post('/auth/register', { name, email, password })
  if (data?.token) localStorage.setItem('access_token', data.token)
  return data
}

export async function login({ email, password }){
  const { data } = await api.post('/auth/login', { email, password })
  if (data?.token) localStorage.setItem('access_token', data.token)
  return data
}

export function logout(){
  localStorage.removeItem('access_token')
}
