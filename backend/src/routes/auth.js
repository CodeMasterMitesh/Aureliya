import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Cart from '../models/Cart.js'
const r = Router()

function sign(user){
  const payload = { id: user._id, email: user.email, role: user.role }
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
  return { token, user: payload }
}

r.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ error: 'Email already registered' })
    const user = await User.create({ name, email, password })
    await Cart.create({ user: user._id, items: [] })
    res.json(sign(user))
  } catch (e) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

r.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await user.comparePassword(password)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    res.json(sign(user))
  } catch (e) {
    res.status(500).json({ error: 'Login failed' })
  }
})

r.post('/merge-cart', async (req, res) => {
  // Accept items to merge upon login
  try {
    const { userId, items = [] } = req.body
    const cart = await Cart.findOne({ user: userId })
    if (!cart) return res.status(404).json({ error: 'Cart not found' })
    for (const it of items) {
      const idx = cart.items.findIndex(x => String(x.product) === String(it.product))
      if (idx >= 0) cart.items[idx].qty += it.qty || 1
      else cart.items.push({ product: it.product, qty: it.qty || 1, price: it.price || 0 })
    }
    await cart.save()
    res.json({ merged: true })
  } catch (e) {
    res.status(500).json({ error: 'Merge failed' })
  }
})

export default r
