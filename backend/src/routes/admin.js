import { Router } from 'express'
import { admin, auth } from '../middleware/auth.js'
import Order from '../models/Order.js'
import User from '../models/User.js'
import { env } from '../config/index.js'
import { runQuery } from '../db/mysql.js'
import Product from '../models/Product.js'
const r = Router()

r.get('/dashboard', auth, admin, async (req, res) => {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dayOfWeek = (startOfDay.getDay() + 6) % 7 // Monday=0
  const startOfWeek = new Date(startOfDay)
  startOfWeek.setDate(startOfDay.getDate() - dayOfWeek)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [todayAgg, weekAgg, monthAgg, users, lowStock, monthSeries, statusAgg] = await Promise.all([
    Order.countDocuments({ createdAt: { $gte: startOfDay } }),
    Order.countDocuments({ createdAt: { $gte: startOfWeek } }),
    Order.countDocuments({ createdAt: { $gte: startOfMonth } }),
    env.MYSQL_ENABLED && env.MYSQL_USERS
      ? (async () => {
          const rows = await runQuery('SELECT COUNT(*) AS c FROM contacts')
          return rows[0].c
        })()
      : User.countDocuments(),
    Product.countDocuments({ stock: { $lt: 5 } }),
    // sales by day for current month
    Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      {
        $group: {
          _id: { d: { $dayOfMonth: '$createdAt' } },
          total: { $sum: '$subtotal' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.d': 1 } },
    ]),
    // orders by status
    Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
  ])

  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const series = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, total: 0, count: 0 }))
  for (const row of monthSeries) {
    const index = row._id.d - 1
    if (series[index]) {
      series[index].total = row.total
      series[index].count = row.count
    }
  }
  const status = statusAgg.reduce((acc, s) => {
    acc[s._id || 'unknown'] = s.count
    return acc
  }, {})

  res.json({
    cards: {
      todayOrders: todayAgg,
      weekOrders: weekAgg,
      monthOrders: monthAgg,
      users,
      lowStock,
    },
    charts: {
      salesByDay: series,
      ordersByStatus: status,
    },
  })
})

export default r

// Admin: list users (basic)
r.get('/users', auth, admin, async (req, res) => {
  if (env.MYSQL_ENABLED && env.MYSQL_USERS) {
    const rows = await runQuery(
      `SELECT id, email, username, contact_type, first_name, last_name, created_at
       FROM contacts ORDER BY id DESC LIMIT 500` // pagination later
    )
    const items = rows.map((r) => ({
      id: r.id,
      name: [r.first_name, r.last_name].filter(Boolean).join(' ').trim(),
      email: r.email,
      role: r.contact_type,
      createdAt: r.created_at,
    }))
    return res.json({ items })
  } else {
    const users = await User.find().select('name email role createdAt').sort({ createdAt: -1 }).lean()
    return res.json({ items: users })
  }
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
  const order = await Order.findById(req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  order.status = status
  order.timeline = [...(order.timeline || []), { status, at: new Date() }]
  await order.save()
  res.json(order)
})
