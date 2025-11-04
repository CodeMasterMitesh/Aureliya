import { Router } from 'express'
import { admin, auth } from '../middleware/auth.js'
import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
const r = Router()

r.get('/dashboard', auth, admin, async (req, res) => {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const [orders24, totalOrders, users, lowStock] = await Promise.all([
    Order.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: null, sales: { $sum: '$subtotal' }, count: { $sum: 1 } } },
    ]),
    Order.countDocuments(),
    User.countDocuments(),
    Product.countDocuments({ stock: { $lt: 5 } }),
  ])
  res.json({ sales24h: orders24[0]?.sales || 0, orders: totalOrders, users, lowStock })
})

export default r
 
// Admin: list users (basic)
r.get('/users', auth, admin, async (req, res) => {
  const users = await User.find().select('name email role createdAt').sort({ createdAt: -1 }).lean()
  res.json({ items: users })
})

// Admin: list orders and update status
r.get('/orders', auth, admin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).lean()
  res.json({ items: orders })
})

r.put('/orders/:id', auth, admin, async (req, res) => {
  const { status } = req.body
  const allowed = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
  if (status && !allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' })
  const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
  res.json(updated)
})
