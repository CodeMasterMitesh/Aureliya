import api from './axios'

export async function uploadProfile(file){
  const form = new FormData()
  form.append('file', file)
  const { data } = await api.post('/uploads/profile', form, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}
