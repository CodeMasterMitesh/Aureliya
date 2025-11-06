import api from './axios'

export const fetchMenuTree = async () => {
  const { data } = await api.get('/menus')
  return data.items
}

export const listMainMenus = async (params) => {
  const { data } = await api.get('/main-menus', { params })
  return data
}

export const listSubMenus = async (params) => {
  const { data } = await api.get('/sub-menus', { params })
  return data
}

export const createMainMenu = (payload) => api.post('/main-menus', payload)
export const updateMainMenu = (id, payload) => api.put(`/main-menus/${id}`, payload)
export const deleteMainMenu = (id) => api.delete(`/main-menus/${id}`)

export const createSubMenu = (payload) => api.post('/sub-menus', payload)
export const updateSubMenu = (id, payload) => api.put(`/sub-menus/${id}`, payload)
export const deleteSubMenu = (id) => api.delete(`/sub-menus/${id}`)
