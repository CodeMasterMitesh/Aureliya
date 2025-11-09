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
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return true
  }
  return false
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
// Increase max limit for main menus to 5000 (though typical counts are low)
r.get(
  '/main-menus',
  [
    query('page').optional().isInt({ min: 1 }),
  query('limit').optional().custom(v => { if (v==='ALL') return true; const n=parseInt(v,10); return Number.isInteger(n)&&n>=1&&n<=5000 }),
    query('search').optional().isString(),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return
    const page = parseInt(req.query.page || '1')
  let limit = req.query.limit === 'ALL' ? 5000 : parseInt(req.query.limit || '20')
  if (limit > 5000) limit = 5000
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
    if (handleValidation(req, res)) return
    const { name, slug, icon, order } = req.body
    const doc = await MainMenu.create({ name, slug: slug || slugify(name), icon, order })
    res.status(201).json(doc)
  }
)

r.get('/main-menus/:id', [param('id').isMongoId()], async (req, res) => {
  if (handleValidation(req, res)) return
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
    if (handleValidation(req, res)) return
    const payload = { ...req.body }
    // Coerce types
    if (payload.order !== undefined) payload.order = parseInt(payload.order)
    if (payload.name && !payload.slug) payload.slug = slugify(payload.name)
    const item = await MainMenu.findByIdAndUpdate(req.params.id, { $set: payload }, { new: true })
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  }
)

r.delete('/main-menus/:id', [param('id').isMongoId()], async (req, res) => {
  if (handleValidation(req, res)) return
  // also remove submenus
  await SubMenu.deleteMany({ main_menu_id: req.params.id })
  const out = await MainMenu.findByIdAndDelete(req.params.id)
  if (!out) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// CRUD: Sub menus
// Increase sub menus limit to 5000
r.get(
  '/sub-menus',
  [
    query('page').optional().isInt({ min: 1 }),
  query('limit').optional().custom(v => { if (v==='ALL') return true; const n=parseInt(v,10); return Number.isInteger(n)&&n>=1&&n<=5000 }),
    query('search').optional().isString(),
    query('main_menu_id').optional().isMongoId(),
    query('parent_id').optional().isMongoId(),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return
    const page = parseInt(req.query.page || '1')
  let limit = req.query.limit === 'ALL' ? 5000 : parseInt(req.query.limit || '20')
  if (limit > 5000) limit = 5000
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
    body('parent_id')
      .customSanitizer((v) => (v === '' ? null : v))
      .optional({ nullable: true })
      .isMongoId(),
    body('name').isString().notEmpty(),
    body('slug').optional().isString(),
    body('path').optional().isString(),
    body('order').optional().isInt(),
    body('meta').optional().isObject(),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return
    let { main_menu_id, parent_id = null, name, slug, path, order = 0, meta = {} } = req.body
    // Normalize parent and order
    if (parent_id === '' || parent_id === undefined) parent_id = null
    order = parseInt(order || 0)
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
  if (handleValidation(req, res)) return
  const item = await SubMenu.findById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

r.put(
  '/sub-menus/:id',
  [
    param('id').isMongoId(),
    body('main_menu_id').optional().isMongoId(),
    body('parent_id')
      .customSanitizer((v) => (v === '' ? null : v))
      .optional({ nullable: true })
      .isMongoId(),
    body('name').optional().isString(),
    body('slug').optional().isString(),
    body('path').optional().isString(),
    body('order').optional().isInt(),
    body('meta').optional().isObject(),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return
    const payload = { ...req.body }
    // Normalize fields
    if (payload.parent_id === '' || payload.parent_id === undefined) payload.parent_id = null
    if (payload.order !== undefined) payload.order = parseInt(payload.order)
    if (payload.name && !payload.slug) payload.slug = slugify(payload.name)
    const item = await SubMenu.findByIdAndUpdate(req.params.id, { $set: payload }, { new: true })
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  }
)

r.delete('/sub-menus/:id', [param('id').isMongoId()], async (req, res) => {
  if (handleValidation(req, res)) return
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

// Import main menus: { rows: [{ name, slug, icon, order }] }
r.post('/main-menus/import', [body('rows').isArray({ min: 1 })], async (req, res) => {
  if (handleValidation(req, res)) return
  const rows = req.body.rows
  const created = []
  const errors = []
  for (let i = 0; i < rows.length; i++) {
    const raw = rows[i] || {}
    const name = (raw.name || raw.Name || '').toString().trim()
    if (!name) { errors.push({ row: i + 2, error: 'Missing name' }); continue }
    const payload = {
      name,
      slug: (raw.slug || '').toString().trim() || slugify(name),
      icon: (raw.icon || '').toString().trim() || undefined,
      order: parseInt(raw.order || 0) || 0,
    }
    try {
      const doc = await MainMenu.create(payload)
      created.push(doc._id)
    } catch (e) {
      errors.push({ row: i + 2, error: e.message })
    }
  }
  res.json({ ok: true, created: created.length, errors })
})

// Import sub menus: { rows: [{ main_menu, parent, name, slug, path, order }] }
r.post('/sub-menus/import', [body('rows').isArray({ min: 1 })], async (req, res) => {
  if (handleValidation(req, res)) return
  const rows = req.body.rows
  const created = []
  const errors = []
  for (let i = 0; i < rows.length; i++) {
    const raw = rows[i] || {}
    const name = (raw.name || raw.Name || '').toString().trim()
    if (!name) { errors.push({ row: i + 2, error: 'Missing name' }); continue }
    let main = null
    if (raw.main_menu_id) main = await MainMenu.findById(raw.main_menu_id)
    if (!main) {
      const mainName = (raw.main_menu || raw.main || '').toString().trim()
      if (mainName) main = await MainMenu.findOne({ name: mainName })
    }
    if (!main) { errors.push({ row: i + 2, error: 'Main menu unresolved' }); continue }
    let parent = null
    const parentName = (raw.parent || '').toString().trim()
    if (parentName) parent = await SubMenu.findOne({ name: parentName, main_menu_id: main._id })
    const payload = {
      main_menu_id: main._id,
      parent_id: parent?._id || null,
      name,
      slug: (raw.slug || '').toString().trim() || slugify(name),
      path: (raw.path || '').toString().trim() || undefined,
      order: parseInt(raw.order || 0) || 0,
      meta: {},
    }
    try {
      const doc = await SubMenu.create(payload)
      created.push(doc._id)
    } catch (e) {
      errors.push({ row: i + 2, error: e.message })
    }
  }
  res.json({ ok: true, created: created.length, errors })
})
