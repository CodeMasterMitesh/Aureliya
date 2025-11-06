import api from './axios'

export const listLedgers = async (params={}) => {
  const { data } = await api.get('/ledgers', { params })
  return data
}

export const createLedger = (payload) => api.post('/ledgers', payload)
export const updateLedger = (id, payload) => api.put(`/ledgers/${id}`, payload)
export const deleteLedger = (id) => api.delete(`/ledgers/${id}`)
export const bulkDeleteLedgers = (ids=[]) => api.delete('/ledgers', { data: { ids } })
