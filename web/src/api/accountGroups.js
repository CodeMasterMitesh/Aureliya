import api from './axios'

export const listAccountGroups = async (params={}) => {
  const { data } = await api.get('/account-groups', { params })
  return data
}

export const createAccountGroup = (payload) => api.post('/account-groups', payload)
export const updateAccountGroup = (id, payload) => api.put(`/account-groups/${id}`, payload)
export const deleteAccountGroup = (id) => api.delete(`/account-groups/${id}`)
export const bulkDeleteAccountGroups = (ids=[]) => api.delete('/account-groups', { data: { ids } })
