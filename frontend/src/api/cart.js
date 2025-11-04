import api from './axios'

export async function fetchCart(){
  const { data } = await api.get('/cart')
  return data
}

export async function addToCart({ slug, qty = 1 }){
  const { data } = await api.post('/cart', { slug, qty })
  return data
}

export async function setCartQty({ slug, qty }){
  const { data } = await api.put('/cart', { slug, qty })
  return data
}

export async function clearCart(){
  const { data } = await api.delete('/cart')
  return data
}
