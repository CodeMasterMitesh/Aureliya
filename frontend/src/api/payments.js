import api from './axios'

export async function createPaymentIntent(orderId){
  const { data } = await api.post('/payments/intent', { orderId })
  return data
}

export async function confirmPayment(paymentId){
  const { data } = await api.post('/payments/confirm', { paymentId })
  return data
}
