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
// Authenticated user profile endpoints
r.get('/me', async (req, res) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    const user = await User.findById(payload.id).lean()
    if (!user) return res.status(404).json({ error: 'User not found' })
    const { _id, name, email, role, profileImage, addresses, createdAt } = user
    return res.json({ id: _id, name, email, role, profileImage, addresses, createdAt })
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
})

r.put('/me', async (req, res) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    const { name, email, profileImage } = req.body
    const user = await User.findByIdAndUpdate(payload.id, { $set: { name, email, profileImage } }, { new: true })
    return res.json({ id: user._id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage, addresses: user.addresses })
  } catch (e) {
    return res.status(400).json({ error: 'Update failed' })
  }
})

r.put('/change-password', async (req, res) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(payload.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    const ok = await user.comparePassword(oldPassword)
    if (!ok) return res.status(400).json({ error: 'Invalid current password' })
    user.password = newPassword
    await user.save()
    return res.json({ ok: true })
  } catch (e) {
    return res.status(400).json({ error: 'Change password failed' })
  }
})

// Addresses
r.post('/me/addresses', async (req, res) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    const user = await User.findById(payload.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    user.addresses.push(req.body)
    await user.save()
    res.status(201).json(user.addresses[user.addresses.length - 1])
  } catch (e) {
    res.status(400).json({ error: 'Add address failed' })
  }
})

r.put('/me/addresses/:id', async (req, res) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    const user = await User.findById(payload.id)
    const addr = user.addresses.id(req.params.id)
    if (!addr) return res.status(404).json({ error: 'Address not found' })
    Object.assign(addr, req.body)
    await user.save()
    res.json(addr)
  } catch (e) {
    res.status(400).json({ error: 'Update address failed' })
  }
})

r.delete('/me/addresses/:id', async (req, res) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    const user = await User.findById(payload.id)
    const addr = user.addresses.id(req.params.id)
    if (!addr) return res.status(404).json({ error: 'Address not found' })
    addr.deleteOne()
    await user.save()
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: 'Delete address failed' })
  }
})
