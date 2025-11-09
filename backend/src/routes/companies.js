import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import Company from '../models/Company.js'
import Branch from '../models/Branch.js'

const r = Router()

function handleValidation(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return false
  }
  return true
}

// List companies with pagination and per-field filters
// Increased max limit to 5000; 'ALL' will be coerced to 5000.
r.get(
  '/companies',
  [
    query('page').optional().isInt({ min: 1 }),
    // Accept numeric or 'ALL'
    query('limit').optional().custom(v => {
      if (v === 'ALL') return true
      const n = parseInt(v,10)
      return Number.isInteger(n) && n >= 1 && n <= 5000
    }),
    query('search').optional().isString(),
    query('name').optional().isString(),
    query('code').optional().isString(),
  ],
  async (req, res) => {
    if (!handleValidation(req, res)) return
    const page = parseInt(req.query.page || '1')
    let limit = req.query.limit === 'ALL' ? 5000 : parseInt(req.query.limit || '20')
    if (!Number.isInteger(limit) || limit < 1) limit = 20
    if (limit > 5000) limit = 5000
    const { search, name, code } = req.query
    const q = {}
    if (search)
      q.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ]
    if (name) q.name = { $regex: name, $options: 'i' }
    if (code) q.code = { $regex: code, $options: 'i' }
    const [items, total] = await Promise.all([
      Company.find(q)
        .sort({ name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Company.countDocuments(q),
    ])
    res.json({ items, total, page, pages: Math.ceil(total / limit) })
  }
)

// List branches by company
r.get('/companies/:id/branches', [param('id').isMongoId()], async (req, res) => {
  if (!handleValidation(req, res)) return
  const items = await Branch.find({ company: req.params.id }).sort({ name: 1 }).lean()
  res.json({ items })
})

// Minimal CRUD (optional: for admin setup)
r.post('/companies', [body('name').isString().notEmpty()], async (req, res) => {
  if (!handleValidation(req, res)) return
  const c = await Company.create(req.body)
  res.status(201).json(c)
})

r.post(
  '/branches',
  [body('company').isMongoId(), body('name').isString().notEmpty()],
  async (req, res) => {
    if (!handleValidation(req, res)) return
    const b = await Branch.create(req.body)
    res.status(201).json(b)
  }
)

// Company detail
r.get('/companies/:id', [param('id').isMongoId()], async (req, res) => {
  if (!handleValidation(req, res)) return
  const c = await Company.findById(req.params.id)
  if (!c) return res.status(404).json({ error: 'Not found' })
  res.json(c)
})

r.put(
  '/companies/:id',
  [
    param('id').isMongoId(),
    body('name').optional().isString(),
    body('code').optional().isString(),
    body('address').optional().isString(),
    body('meta').optional().isObject(),
  ],
  async (req, res) => {
    if (!handleValidation(req, res)) return
    const c = await Company.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!c) return res.status(404).json({ error: 'Not found' })
    res.json(c)
  }
)

r.delete('/companies/:id', [param('id').isMongoId()], async (req, res) => {
  if (!handleValidation(req, res)) return
  // Prevent delete if branches exist
  const branches = await Branch.countDocuments({ company: req.params.id })
  if (branches > 0) return res.status(400).json({ error: 'Delete branches first' })
  const out = await Company.findByIdAndDelete(req.params.id)
  if (!out) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// Multi-delete companies
r.delete('/companies', [body('ids').isArray({ min: 1 })], async (req, res) => {
  if (!handleValidation(req, res)) return
  const ids = req.body.ids
  const blocked = await Branch.find({ company: { $in: ids } })
    .limit(1)
    .lean()
  if (blocked.length)
    return res.status(400).json({ error: 'Some companies have branches. Delete branches first.' })
  await Company.deleteMany({ _id: { $in: ids } })
  res.json({ ok: true })
})

// Branches listing (paginated)
// Increased max limit for branches listing as well.
r.get(
  '/branches',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().custom(v => {
      if (v === 'ALL') return true
      const n = parseInt(v,10)
      return Number.isInteger(n) && n >= 1 && n <= 5000
    }),
    query('search').optional().isString(),
    query('name').optional().isString(),
    query('code').optional().isString(),
    query('company').optional().isMongoId(),
  ],
  async (req, res) => {
    if (!handleValidation(req, res)) return
    const page = parseInt(req.query.page || '1')
    let limit = req.query.limit === 'ALL' ? 5000 : parseInt(req.query.limit || '20')
    if (!Number.isInteger(limit) || limit < 1) limit = 20
    if (limit > 5000) limit = 5000
    const { search, name, code, company } = req.query
    const q = {}
    if (company) q.company = company
    if (search)
      q.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ]
    if (name) q.name = { $regex: name, $options: 'i' }
    if (code) q.code = { $regex: code, $options: 'i' }
    const [items, total] = await Promise.all([
      Branch.find(q)
        .sort({ name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('company', 'name code')
        .lean(),
      Branch.countDocuments(q),
    ])
    res.json({ items, total, page, pages: Math.ceil(total / limit) })
  }
)

// Branch detail
r.get('/branches/:id', [param('id').isMongoId()], async (req, res) => {
  if (!handleValidation(req, res)) return
  const b = await Branch.findById(req.params.id)
  if (!b) return res.status(404).json({ error: 'Not found' })
  res.json(b)
})

r.put(
  '/branches/:id',
  [
    param('id').isMongoId(),
    body('company').optional().isMongoId(),
    body('name').optional().isString(),
    body('code').optional().isString(),
    body('address').optional().isString(),
    body('meta').optional().isObject(),
  ],
  async (req, res) => {
    if (!handleValidation(req, res)) return
    const b = await Branch.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!b) return res.status(404).json({ error: 'Not found' })
    res.json(b)
  }
)

r.delete('/branches/:id', [param('id').isMongoId()], async (req, res) => {
  if (!handleValidation(req, res)) return
  const out = await Branch.findByIdAndDelete(req.params.id)
  if (!out) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// Multi-delete branches
r.delete('/branches', [body('ids').isArray({ min: 1 })], async (req, res) => {
  if (!handleValidation(req, res)) return
  await Branch.deleteMany({ _id: { $in: req.body.ids } })
  res.json({ ok: true })
})
export default r

// CSV/JSON import endpoints
// Accepts { rows: [{ name, code, address }] }
r.post('/companies/import', [body('rows').isArray({ min: 1 })], async (req, res) => {
  if (!handleValidation(req, res)) return
  const rows = req.body.rows
  const created = []
  const errors = []
  for (let i = 0; i < rows.length; i++) {
    const raw = rows[i] || {}
    const name = (raw.name || raw.Name || '').toString().trim()
    const code = (raw.code || raw.Code || '').toString().trim() || undefined
    const address = (raw.address || raw.Address || '').toString().trim() || undefined
    if (!name) { errors.push({ row: i + 2, error: 'Missing name' }); continue }
    try {
      const doc = await Company.create({ name, code, address })
      created.push(doc._id)
    } catch (e) {
      errors.push({ row: i + 2, error: e.message })
    }
  }
  res.json({ ok: true, created: created.length, errors })
})

// Accepts { rows: [{ company, company_code, name, code, address }] }
r.post('/branches/import', [body('rows').isArray({ min: 1 })], async (req, res) => {
  if (!handleValidation(req, res)) return
  const rows = req.body.rows
  const created = []
  const errors = []
  for (let i = 0; i < rows.length; i++) {
    const raw = rows[i] || {}
    const companyName = (raw.company || raw.company_name || '').toString().trim()
    const companyCode = (raw.company_code || '').toString().trim()
    const name = (raw.name || raw.branch || raw.Branch || '').toString().trim()
    const code = (raw.code || raw.BranchCode || '').toString().trim() || undefined
    const address = (raw.address || '').toString().trim() || undefined
    if (!name) { errors.push({ row: i + 2, error: 'Missing branch name' }); continue }
    let company = null
    if (raw.company_id) company = await Company.findById(raw.company_id).lean()
    if (!company && companyCode) company = await Company.findOne({ code: companyCode }).lean()
    if (!company && companyName) company = await Company.findOne({ name: companyName }).lean()
    try {
      const doc = await Branch.create({ company: company?._id, name, code, address })
      created.push(doc._id)
    } catch (e) {
      errors.push({ row: i + 2, error: e.message })
    }
  }
  res.json({ ok: true, created: created.length, errors })
})
