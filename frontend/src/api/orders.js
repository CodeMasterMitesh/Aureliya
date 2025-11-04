import api from './axios'

export async function createOrder(payload){
  const { data } = await api.post('/orders', payload || {})
  return data
}

export async function fetchOrders(){
  const { data } = await api.get('/orders')
  return data
}

export async function fetchOrderById(id){
  const { data } = await api.get(`/orders/${id}`)
  return data
}
