import api from './axios'

export async function getMe(){
  const { data } = await api.get('/auth/me')
  return data
}

export async function updateMe(payload){
  const { data } = await api.put('/auth/me', payload)
  return data
}

export async function changePassword({ oldPassword, newPassword }){
  const { data } = await api.put('/auth/change-password', { oldPassword, newPassword })
  return data
}

export async function addAddress(addr){
  const { data } = await api.post('/auth/me/addresses', addr)
  return data
}

export async function updateAddress(id, addr){
  const { data } = await api.put(`/auth/me/addresses/${id}`, addr)
  return data
}

export async function deleteAddress(id){
  const { data } = await api.delete(`/auth/me/addresses/${id}`)
  return data
}
