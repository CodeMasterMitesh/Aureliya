import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import MainMenu from '../models/MainMenu.js'
import SubMenu from '../models/SubMenu.js'

const r = Router()

function slugify(str = '') {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9\s-/]/g, '')
    .replace(/[\s/]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function handleValidation(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
}

// GET /api/menus -> nested structure
r.get('/menus', async (req, res) => {
  try {
    const mains = await MainMenu.aggregate([
      { $sort: { order: 1, name: 1 } },
      {
        $lookup: {
          from: 'submenus',
          let: { mid: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$main_menu_id', '$$mid'] }, { $eq: ['$parent_id', null] }],
                },
              },
            },
            { $sort: { order: 1, name: 1 } },
          ],
          as: 'submenus',
        },
      },
    ])

    // recursively attach children for each submenu
    const allSubs = await SubMenu.find().lean()
    const byParent = allSubs.reduce((acc, s) => {
      const key = String(s.parent_id || 'root-' + s.main_menu_id)
      acc[key] = acc[key] || []
      acc[key].push(s)
      return acc
    }, {})

    function buildTree(node) {
      const key = String(node._id)
      const kids = byParent[key] || []
      return {
        ...node,
        submenus: kids
          .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
          .map(buildTree),
      }
    }

    const items = mains.map((m) => {
      const tops = byParent['root-' + m._id] || []
      return {
        _id: m._id,
        name: m.name,
        slug: m.slug,
        icon: m.icon,
        order: m.order,
        submenus: tops
          .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
          .map(buildTree),
      }
    })
    res.json({ items })
  } catch (e) {
    res.status(500).json({ error: 'Failed to build menu tree' })
  }
})

// CRUD: Main menus
r.get(
  '/main-menus',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 200 }),
    query('search').optional().isString(),
  ],
  async (req, res) => {
    handleValidation(req, res)
    const page = parseInt(req.query.page || '1')
    const limit = parseInt(req.query.limit || '20')
    const search = req.query.search?.trim()
    const q = search ? { name: { $regex: search, $options: 'i' } } : {}
    const [items, total] = await Promise.all([
      MainMenu.find(q)
        .sort({ order: 1, name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      MainMenu.countDocuments(q),
    ])
    res.json({ items, total, page, pages: Math.ceil(total / limit) })
  }
)

r.post(
  '/main-menus',
  [
    body('name').isString().notEmpty(),
    body('slug').optional().isString(),
    body('icon').optional().isString(),
    body('order').optional().isInt(),
  ],
  async (req, res) => {
    handleValidation(req, res)
    const { name, slug, icon, order } = req.body
    const doc = await MainMenu.create({ name, slug: slug || slugify(name), icon, order })
    res.status(201).json(doc)
  }
)

r.get('/main-menus/:id', [param('id').isMongoId()], async (req, res) => {
  handleValidation(req, res)
  const item = await MainMenu.findById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

r.put(
  '/main-menus/:id',
  [
    param('id').isMongoId(),
    body('name').optional().isString(),
    body('slug').optional().isString(),
    body('icon').optional().isString(),
    body('order').optional().isInt(),
  ],
  async (req, res) => {
    handleValidation(req, res)
    const payload = { ...req.body }
    if (payload.name && !payload.slug) payload.slug = slugify(payload.name)
    const item = await MainMenu.findByIdAndUpdate(req.params.id, { $set: payload }, { new: true })
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  }
)

r.delete('/main-menus/:id', [param('id').isMongoId()], async (req, res) => {
  handleValidation(req, res)
  // also remove submenus
  await SubMenu.deleteMany({ main_menu_id: req.params.id })
  const out = await MainMenu.findByIdAndDelete(req.params.id)
  if (!out) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// CRUD: Sub menus
r.get(
  '/sub-menus',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 200 }),
    query('search').optional().isString(),
    query('main_menu_id').optional().isMongoId(),
    query('parent_id').optional().isMongoId(),
  ],
  async (req, res) => {
    handleValidation(req, res)
    const page = parseInt(req.query.page || '1')
    const limit = parseInt(req.query.limit || '20')
    const { search, main_menu_id, parent_id } = req.query
    const q = {}
    if (search) q.name = { $regex: search, $options: 'i' }
    if (main_menu_id) q.main_menu_id = main_menu_id
    if (parent_id) q.parent_id = parent_id
    const [items, total] = await Promise.all([
      SubMenu.find(q)
        .sort({ order: 1, name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      SubMenu.countDocuments(q),
    ])
    res.json({ items, total, page, pages: Math.ceil(total / limit) })
  }
)

r.post(
  '/sub-menus',
  [
    body('main_menu_id').isMongoId(),
    body('parent_id').optional({ nullable: true }).isMongoId(),
    body('name').isString().notEmpty(),
    body('slug').optional().isString(),
    body('path').optional().isString(),
    body('order').optional().isInt(),
    body('meta').optional().isObject(),
  ],
  async (req, res) => {
    handleValidation(req, res)
    const { main_menu_id, parent_id = null, name, slug, path, order = 0, meta = {} } = req.body
    const doc = await SubMenu.create({
      main_menu_id,
      parent_id,
      name,
      slug: slug || slugify(name),
      path,
      order,
      meta,
    })
    res.status(201).json(doc)
  }
)

r.get('/sub-menus/:id', [param('id').isMongoId()], async (req, res) => {
  handleValidation(req, res)
  const item = await SubMenu.findById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

r.put(
  '/sub-menus/:id',
  [
    param('id').isMongoId(),
    body('main_menu_id').optional().isMongoId(),
    body('parent_id').optional({ nullable: true }).isMongoId(),
    body('name').optional().isString(),
    body('slug').optional().isString(),
    body('path').optional().isString(),
    body('order').optional().isInt(),
    body('meta').optional().isObject(),
  ],
  async (req, res) => {
    handleValidation(req, res)
    const payload = { ...req.body }
    if (payload.name && !payload.slug) payload.slug = slugify(payload.name)
    const item = await SubMenu.findByIdAndUpdate(req.params.id, { $set: payload }, { new: true })
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  }
)

r.delete('/sub-menus/:id', [param('id').isMongoId()], async (req, res) => {
  handleValidation(req, res)
  // recursively delete children
  const toDelete = [req.params.id]
  while (toDelete.length) {
    const id = toDelete.pop()
    const children = await SubMenu.find({ parent_id: id }).select('_id').lean()
    toDelete.push(...children.map((c) => String(c._id)))
    await SubMenu.findByIdAndDelete(id)
  }
  res.json({ ok: true })
})

export default r
