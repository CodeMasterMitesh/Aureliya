import api from './axios'

export async function createOrder(){
  const { data } = await api.post('/orders')
  return data
}

export async function fetchOrders(){
  const { data } = await api.get('/orders')
  return data
}
