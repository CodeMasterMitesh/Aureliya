import { Router } from 'express'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import { admin, auth } from '../middleware/auth.js'
import { AppError } from '../middleware/error.js'

const r = Router()

r.get('/', async (req, res, next) => {
  const { q, category, sort = 'newest' } = req.query
  const page = Math.max(1, parseInt(req.query.page || '1', 10))
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit || '12', 10)))

  const find = {}
  if (q) find.$text = { $search: q }
  if (category) {
    try {
      const cat = await Category.findOne({ slug: category.toLowerCase() })
      if (cat) find.category = cat._id
      else return res.json({ items: [], total: 0, page, limit, categories: [] })
    } catch (e) {
      return next(new AppError('Invalid category filter', 400, 'BAD_REQUEST'))
    }
  }

  const sortMap = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating_desc: { 'rating.avg': -1 },
    newest: { createdAt: -1 },
  }

  const [items, total, categories] = await Promise.all([
    Product.find(find)
      .sort(sortMap[sort] || sortMap.newest)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category', 'name slug')
      .lean(),
    Product.countDocuments(find),
    Category.find().select('name slug -_id').lean(),
  ])

  const mapped = items.map((p) => ({
    _id: p._id,
    slug: p.slug,
    title: p.title,
    category: p.category?.slug || null,
    price: p.price,
    rating: p.rating,
    image: p.images?.[0] || null,
    createdAt: p.createdAt?.getTime?.() || Date.now(),
  }))

  res.json({ items: mapped, total, page, limit, categories: categories.map((c) => c.slug) })
})

r.get('/:slug', async (req, res) => {
  const p = await Product.findOne({ slug: req.params.slug })
    .populate('category', 'name slug')
    .lean()
  if (!p) return res.status(404).json({ error: 'Not found' })
  res.json({
    _id: p._id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category?.slug || null,
    price: p.price,
    rating: p.rating,
    images: p.images,
    stock: p.stock,
    createdAt: p.createdAt,
  })
})

// Admin CRUD
r.post('/', auth, admin, async (req, res) => {
  const { title, slug, price, category, images = [], description = '', stock = 100 } = req.body
  let catId = null
  if (category) {
    const cat = await Category.findOne({ slug: category })
    if (cat) catId = cat._id
  }
  const p = await Product.create({
    title,
    slug,
    price,
    category: catId,
    images,
    description,
    stock,
  })
  res.status(201).json(p)
})

r.put('/:id', auth, admin, async (req, res) => {
  const body = { ...req.body }
  if (body.category && typeof body.category === 'string') {
    const cat = await Category.findOne({ slug: body.category })
    body.category = cat?._id || undefined
  }
  const updated = await Product.findByIdAndUpdate(req.params.id, body, { new: true })
  res.json(updated)
})

r.delete('/:id', auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default r
