import api from './axios'

export async function fetchProducts(params = {}) {
  const { q, category, sort = 'newest', page = 1, limit = 12 } = params
  const res = await api.get('/products', { params: { q, category, sort, page, limit } })
  return res.data
}

export async function fetchProduct(slug) {
  const res = await api.get(`/products/${slug}`)
  return res.data
}
