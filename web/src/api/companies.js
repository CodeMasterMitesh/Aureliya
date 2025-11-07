import api from './axios'

// Simple helpers for dropdowns/quick fetch
export const fetchCompanies = async (search) => {
  try {
    const { data } = await api.get('/companies', { params: { search, limit: 200 } })
    return data.items
  } catch { return [] }
}

export const fetchBranches = async (companyId) => {
  if (!companyId) return []
  try {
    const { data } = await api.get(`/companies/${companyId}/branches`)
    return data.items
  } catch { return [] }
}

// Paginated listings
export const listCompanies = async (params={}) => {
  const { data } = await api.get('/companies', { params })
  return data // { items, total, page, pages }
}

export const listBranches = async (params={}) => {
  const { data } = await api.get('/branches', { params })
  return data // { items, total, page, pages }
}

// CRUD Companies
export const createCompany = (payload) => api.post('/companies', payload)
export const updateCompany = (id, payload) => api.put(`/companies/${id}`, payload)
export const deleteCompany = (id) => api.delete(`/companies/${id}`)
export const bulkDeleteCompanies = (ids=[]) => api.delete('/companies', { data: { ids } })

// CRUD Branches
export const createBranch = (payload) => api.post('/branches', payload)
export const updateBranch = (id, payload) => api.put(`/branches/${id}`, payload)
export const deleteBranch = (id) => api.delete(`/branches/${id}`)
export const bulkDeleteBranches = (ids=[]) => api.delete('/branches', { data: { ids } })
