import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
const r = Router()

// Create order from current cart (mocked payment)
r.post('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product').lean()
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' })
  const items = cart.items.map(it => ({ product: it.product._id, title: it.product.title, price: it.price, qty: it.qty }))
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const order = await Order.create({ user: req.user.id, items, subtotal, status: 'paid', paymentStatus: 'paid', paymentRef: 'mock_' + Date.now() })
  // Clear cart
  await Cart.updateOne({ user: req.user.id }, { $set: { items: [] } })
  res.status(201).json(order)
})

// Get user's orders
r.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).lean()
  res.json({ items: orders })
})

export default r
