import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import Company from '../models/Company.js'
import Branch from '../models/Branch.js'

const r = Router()

function handleValidation(req, res){
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return false
  }
  return true
}

// List companies with pagination and per-field filters
r.get('/companies', [
  query('page').optional().isInt({ min:1 }),
  query('limit').optional().isInt({ min:1, max:200 }),
  query('search').optional().isString(),
  query('name').optional().isString(),
  query('code').optional().isString(),
], async (req, res) => {
  if (!handleValidation(req,res)) return
  const page = parseInt(req.query.page||'1')
  const limit = parseInt(req.query.limit||'20')
  const { search, name, code } = req.query
  const q = {}
  if (search) q.$or = [{ name: { $regex: search, $options:'i' } }, { code: { $regex: search, $options:'i' } }]
  if (name) q.name = { $regex: name, $options:'i' }
  if (code) q.code = { $regex: code, $options:'i' }
  const [items, total] = await Promise.all([
    Company.find(q).sort({ name: 1 }).skip((page-1)*limit).limit(limit).lean(),
    Company.countDocuments(q)
  ])
  res.json({ items, total, page, pages: Math.ceil(total/limit) })
})

// List branches by company
r.get('/companies/:id/branches', [param('id').isMongoId()], async (req, res) => {
  if (!handleValidation(req,res)) return
  const items = await Branch.find({ company: req.params.id }).sort({ name: 1 }).lean()
  res.json({ items })
})

// Minimal CRUD (optional: for admin setup)
r.post('/companies', [body('name').isString().notEmpty()], async (req, res) => {
  if (!handleValidation(req,res)) return
  const c = await Company.create(req.body)
  res.status(201).json(c)
})

r.post('/branches', [
  body('company').isMongoId(),
  body('name').isString().notEmpty()
], async (req, res) => {
  if (!handleValidation(req,res)) return
  const b = await Branch.create(req.body)
  res.status(201).json(b)
})

// Company detail
r.get('/companies/:id', [param('id').isMongoId()], async (req,res)=>{
  if (!handleValidation(req,res)) return
  const c = await Company.findById(req.params.id)
  if (!c) return res.status(404).json({ error: 'Not found' })
  res.json(c)
})

r.put('/companies/:id', [
  param('id').isMongoId(),
  body('name').optional().isString(),
  body('code').optional().isString(),
  body('address').optional().isString(),
  body('meta').optional().isObject(),
], async (req,res)=>{
  if (!handleValidation(req,res)) return
  const c = await Company.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
  if (!c) return res.status(404).json({ error: 'Not found' })
  res.json(c)
})

r.delete('/companies/:id', [param('id').isMongoId()], async (req,res)=>{
  if (!handleValidation(req,res)) return
  // Prevent delete if branches exist
  const branches = await Branch.countDocuments({ company: req.params.id })
  if (branches > 0) return res.status(400).json({ error: 'Delete branches first' })
  const out = await Company.findByIdAndDelete(req.params.id)
  if (!out) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// Multi-delete companies
r.delete('/companies', [body('ids').isArray({ min:1 })], async (req,res)=>{
  if (!handleValidation(req,res)) return
  const ids = req.body.ids
  const blocked = await Branch.find({ company: { $in: ids } }).limit(1).lean()
  if (blocked.length) return res.status(400).json({ error: 'Some companies have branches. Delete branches first.' })
  await Company.deleteMany({ _id: { $in: ids } })
  res.json({ ok: true })
})

// Branches listing (paginated)
r.get('/branches', [
  query('page').optional().isInt({ min:1 }),
  query('limit').optional().isInt({ min:1, max:200 }),
  query('search').optional().isString(),
  query('name').optional().isString(),
  query('code').optional().isString(),
  query('company').optional().isMongoId(),
], async (req,res)=>{
  if (!handleValidation(req,res)) return
  const page = parseInt(req.query.page||'1')
  const limit = parseInt(req.query.limit||'20')
  const { search, name, code, company } = req.query
  const q = {}
  if (company) q.company = company
  if (search) q.$or = [{ name: { $regex: search, $options:'i' } }, { code: { $regex: search, $options:'i' } }]
  if (name) q.name = { $regex: name, $options:'i' }
  if (code) q.code = { $regex: code, $options:'i' }
  const [items, total] = await Promise.all([
    Branch.find(q).sort({ name: 1 }).skip((page-1)*limit).limit(limit).populate('company','name code').lean(),
    Branch.countDocuments(q)
  ])
  res.json({ items, total, page, pages: Math.ceil(total/limit) })
})

// Branch detail
r.get('/branches/:id', [param('id').isMongoId()], async (req,res)=>{
  handleValidation(req,res)
  const b = await Branch.findById(req.params.id)
  if (!b) return res.status(404).json({ error: 'Not found' })
  res.json(b)
})

r.put('/branches/:id', [
  param('id').isMongoId(),
  body('company').optional().isMongoId(),
  body('name').optional().isString(),
  body('code').optional().isString(),
  body('address').optional().isString(),
  body('meta').optional().isObject(),
], async (req,res)=>{
  handleValidation(req,res)
  const b = await Branch.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
  if (!b) return res.status(404).json({ error: 'Not found' })
  res.json(b)
})

r.delete('/branches/:id', [param('id').isMongoId()], async (req,res)=>{
  handleValidation(req,res)
  const out = await Branch.findByIdAndDelete(req.params.id)
  if (!out) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// Multi-delete branches
r.delete('/branches', [body('ids').isArray({ min:1 })], async (req,res)=>{
  handleValidation(req,res)
  await Branch.deleteMany({ _id: { $in: req.body.ids } })
  res.json({ ok: true })
})
export default r
