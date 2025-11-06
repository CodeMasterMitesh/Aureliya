import api from './axios'

export const fetchCompanies = async (search) => {
  const { data } = await api.get('/companies', { params: { search } })
  return data.items
}

export const fetchBranches = async (companyId) => {
  if (!companyId) return []
  const { data } = await api.get(`/companies/${companyId}/branches`)
  return data.items
}
