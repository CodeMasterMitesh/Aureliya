import { Router } from 'express'
import Category from '../models/Category.js'
import { admin, auth } from '../middleware/auth.js'

const r = Router()

r.get('/', async (req, res) => {
  const items = await Category.find().sort({ name: 1 }).lean()
  res.json({ items, total: items.length })
})

r.post('/', auth, admin, async (req, res) => {
  const { name, slug } = req.body
  const created = await Category.create({ name, slug })
  res.status(201).json(created)
})

r.put('/:id', auth, admin, async (req, res) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updated)
})

r.delete('/:id', auth, admin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default r
