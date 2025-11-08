import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
// Unified ledger operations on User model; legacy Ledger model deprecated.
import User from '../models/User.js'
import AccountGroup from '../models/AccountGroup.js'
import Company from '../models/Company.js'
import Branch from '../models/Branch.js'
import { auth } from '../middleware/auth.js'

const r = Router()

function v(req, res) {
  const e = validationResult(req)
  if (!e.isEmpty()) {
    res.status(400).json({ errors: e.array() })
    return false
  }
  return true
}

// List ledgers with pagination and filters
// List unified ledger entries (Users with embedded ledger data)
r.get(
  '/ledgers',
  auth,
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 200 }),
    query('search').optional().isString(),
    query('company').optional().isMongoId(),
    query('branch').optional().isMongoId(),
    query('account_group_id').optional().isMongoId(),
    query('is_active').optional().isBoolean(),
  ],
  async (req, res) => {
    if (!v(req, res)) return
    const page = parseInt(req.query.page || '1')
    const limit = parseInt(req.query.limit || '20')
    const { search, company, branch, account_group_id, is_active } = req.query
    const q = {}
    // filter inside embedded ledger subdocument
    if (search)
      q.$or = [
        { 'ledger.title': { $regex: search, $options: 'i' } },
        { 'ledger.account_group_name': { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
      ]
    if (company) q.company = company
    if (branch) q.branch = branch
    if (account_group_id) q['ledger.account_group_id'] = account_group_id
    if (typeof is_active !== 'undefined') q['ledger.is_active'] = is_active === 'true'
    // Only users that have a ledger title
    q['ledger.title'] = { $exists: true, $ne: '' }
    const [items, total] = await Promise.all([
      User.find(q)
        .sort({ 'ledger.title': 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      User.countDocuments(q),
    ])
    // Map to ledger-style objects expected by frontend
    const mapped = items.map(u => ({
      _id: u._id,
      title: u.ledger?.title,
      account_group_id: u.ledger?.account_group_id,
      account_group_name: u.ledger?.account_group_name,
      email: u.email,
      mobile_no: u.ledger?.mobile_no,
      gstin: u.ledger?.gstin,
      pan_no: u.ledger?.pan_no,
      is_active: u.ledger?.is_active,
      company: u.company,
      branch: u.branch,
    }))
    res.json({ items: mapped, total, page, pages: Math.ceil(total / limit) })
  }
)

// Create ledger
// Create ledger entry directly on User (embedded ledger subdocument). If user already exists by email, update ledger; else create new user.
r.post(
  '/ledgers',
  auth,
  [
    body('title').isString().notEmpty(),
    body('account_group_id').optional().isMongoId(),
    body('company').optional().isMongoId(),
    body('branch').optional().isMongoId(),
    body('email').optional().isEmail(),
    body('type').optional().isString(),
    body('tds_percentage').optional().isNumeric(),
    body('credit_period_days').optional().isNumeric(),
  ],
  async (req, res) => {
    if (!v(req, res)) return
    const payload = { ...req.body }
    const ledger = { ...payload, updated_at: new Date(), title: payload.title }
    // Resolve names
    if (payload.account_group_id) {
      const ag = await AccountGroup.findById(payload.account_group_id).lean()
      if (ag) ledger.account_group_name = ag.name
    }
    if (payload.company) {
      const c = await Company.findById(payload.company).lean()
      if (c) ledger.company_name = c.name
    }
    if (payload.branch) {
      const b = await Branch.findById(payload.branch).lean()
      if (b) ledger.branch_name = b.name
    }
    let user = null
    if (payload.email) {
      user = await User.findOne({ email: payload.email })
    }
    if (user) {
      // Update existing user ledger subdocument
      user.ledger = { ...user.ledger, ...ledger }
      if (payload.company) user.company = payload.company
      if (payload.branch) user.branch = payload.branch
      if (payload.type) user.type = payload.type
      await user.save()
    } else {
      // Create new user with placeholder credentials if none provided
      const name = payload.title || 'Ledger Entry'
      const password = 'Temp#' + Math.random().toString(36).slice(2, 10) // hashed by pre-save hook
      user = await User.create({
        name,
        email: payload.email, // may be undefined
        password,
        company: payload.company,
        branch: payload.branch,
        type: payload.type || 'customer', // default type if not provided
        ledger,
      })
    }
    res.status(201).json({
      _id: user._id,
      title: user.ledger.title,
      account_group_id: user.ledger.account_group_id,
      account_group_name: user.ledger.account_group_name,
      email: user.email,
      mobile_no: user.ledger.mobile_no,
      gstin: user.ledger.gstin,
      pan_no: user.ledger.pan_no,
      is_active: user.ledger.is_active,
      company: user.company,
      branch: user.branch,
    })
  }
)

// Get one
// Get one unified ledger (User with ledger data)
r.get('/ledgers/:id', auth, [param('id').isMongoId()], async (req, res) => {
  if (!v(req, res)) return
  const doc = await User.findById(req.params.id)
  if (!doc || !doc.ledger?.title) return res.status(404).json({ error: 'Not found' })
  res.json({
    _id: doc._id,
    ...doc.ledger,
    email: doc.email,
    company: doc.company,
    branch: doc.branch,
  })
})

// Update ledger
// Update unified ledger (User ledger subdocument)
r.put(
  '/ledgers/:id',
  auth,
  [
    param('id').isMongoId(),
    body('title').optional().isString(),
    body('account_group_id').optional().isMongoId(),
    body('company').optional().isMongoId(),
    body('branch').optional().isMongoId(),
    body('email').optional().isEmail(),
    body('type').optional().isString(),
    body('tds_percentage').optional().isNumeric(),
    body('credit_period_days').optional().isNumeric(),
  ],
  async (req, res) => {
    if (!v(req, res)) return
    const doc = await User.findById(req.params.id)
    if (!doc || !doc.ledger) return res.status(404).json({ error: 'Not found' })
    const payload = { ...req.body }
    // Resolve lookups
    if (payload.account_group_id) {
      const ag = await AccountGroup.findById(payload.account_group_id).lean()
      if (ag) payload.account_group_name = ag.name
    }
    if (payload.company) {
      const c = await Company.findById(payload.company).lean()
      if (c) doc.company = payload.company
    }
    if (payload.branch) {
      const b = await Branch.findById(payload.branch).lean()
      if (b) doc.branch = payload.branch
    }
    doc.ledger = { ...doc.ledger, ...payload, updated_at: new Date() }
    if (payload.email) doc.email = payload.email
    if (payload.type) doc.type = payload.type
    await doc.save()
    res.json({
      _id: doc._id,
      ...doc.ledger,
      email: doc.email,
      company: doc.company,
      branch: doc.branch,
    })
  }
)

// Delete ledger
// Delete unified ledger (remove ledger subdocument or entire user?) Here we remove ledger data only.
r.delete('/ledgers/:id', auth, [param('id').isMongoId()], async (req, res) => {
  if (!v(req, res)) return
  const doc = await User.findById(req.params.id)
  if (!doc || !doc.ledger) return res.status(404).json({ error: 'Not found' })
  doc.ledger = undefined
  await doc.save()
  res.json({ ok: true })
})

// Bulk delete ledgers
// Bulk remove ledger subdocuments from Users
r.delete('/ledgers', auth, [body('ids').isArray({ min: 1 })], async (req, res) => {
  if (!v(req, res)) return
  const ids = req.body.ids
  const users = await User.find({ _id: { $in: ids } })
  for (const u of users) {
    if (u.ledger) {
      u.ledger = undefined
      await u.save()
    }
  }
  res.json({ ok: true })
})

export default r
