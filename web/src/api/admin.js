import api from './axios'

export const adminDashboard = async () => {
  const { data } = await api.get('/admin/dashboard')
  return data
}
