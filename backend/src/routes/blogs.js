import { Router } from 'express'
import Blog from '../models/Blog.js'
import { admin, auth } from '../middleware/auth.js'

const r = Router()

r.get('/', async (req, res) => {
  const items = await Blog.find().sort({ createdAt: -1 }).lean()
  res.json({ items, total: items.length })
})

r.get('/:slug', async (req, res) => {
  const b = await Blog.findOne({ slug: req.params.slug }).lean()
  if (!b) return res.status(404).json({ error: 'Not found' })
  res.json(b)
})

// Admin CRUD
r.post('/', auth, admin, async (req, res) => {
  const created = await Blog.create(req.body)
  res.status(201).json(created)
})

r.put('/:id', auth, admin, async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updated)
})

r.delete('/:id', auth, admin, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default r
