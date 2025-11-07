import api from './axios'

export async function register({ name, email, password }){
  // Cookie with JWT set server-side; response body still returns user payload for state.
  const { data } = await api.post('/auth/register', { name, email, password })
  return data
}

export async function login({ email, password, identifier, companyId, branchId }){
  const { data } = await api.post('/auth/login', { email, password, identifier, companyId, branchId })
  return data
}

export async function logout(){
  try { await api.post('/auth/logout') } catch {/* ignore */}
}
