import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Payment from '../models/Payment.js'

const r = Router()

// Create a mock payment intent for an order
r.post('/intent', auth, async (req, res) => {
  const { orderId } = req.body
  const order = await Order.findOne({ _id: orderId, user: req.user.id })
  if (!order) return res.status(404).json({ error: 'Order not found' })
  if (order.paymentStatus === 'paid') return res.status(400).json({ error: 'Order already paid' })
  const payment = await Payment.create({
    order: order._id,
    amount: order.subtotal,
    status: 'created',
    provider: 'mock',
    ref: 'pi_' + Date.now(),
  })
  res.json({ clientSecret: payment.ref, paymentId: payment._id })
})

// Confirm mock payment and mark order paid
r.post('/confirm', auth, async (req, res) => {
  const { paymentId } = req.body
  const payment = await Payment.findById(paymentId)
  if (!payment) return res.status(404).json({ error: 'Payment not found' })
  const order = await Order.findOne({ _id: payment.order, user: req.user.id })
  if (!order) return res.status(404).json({ error: 'Order not found' })
  payment.status = 'paid'
  await payment.save()
  order.paymentStatus = 'paid'
  order.status = 'paid'
  order.paymentRef = payment.ref
  order.timeline = [...(order.timeline || []), { status: 'paid', at: new Date() }]
  await order.save()
  // Clear cart after successful payment
  await Cart.updateOne({ user: req.user.id }, { $set: { items: [] } })
  res.json({ ok: true })
})

export default r
