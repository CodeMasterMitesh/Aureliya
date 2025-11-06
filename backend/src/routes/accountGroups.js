import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import AccountGroup from '../models/AccountGroup.js'
import { auth, admin } from '../middleware/auth.js'

const r = Router()

function v(req,res){
	const e = validationResult(req)
	if (!e.isEmpty()) { res.status(400).json({ errors: e.array() }); return false }
	return true
}

// List with pagination/search and company/branch filters
r.get('/account-groups', auth, [
	query('page').optional().isInt({ min:1 }),
	query('limit').optional().isInt({ min:1, max:200 }),
	query('search').optional().isString(),
	query('company').optional().isMongoId(),
	query('branch').optional().isMongoId(),
], async (req,res)=>{
	if (!v(req,res)) return
	const page = parseInt(req.query.page||'1')
	const limit = parseInt(req.query.limit||'20')
	const { search, company, branch } = req.query
	const q = {}
	if (search) q.name = { $regex: search, $options: 'i' }
	if (company) q.company = company
	if (branch) q.branch = branch
	const [items, total] = await Promise.all([
		AccountGroup.find(q).sort({ name: 1 }).skip((page-1)*limit).limit(limit).lean(),
		AccountGroup.countDocuments(q)
	])
	res.json({ items, total, page, pages: Math.ceil(total/limit) })
})

// Create
r.post('/account-groups', auth, [
	body('name').isString().notEmpty(),
	body('code').optional().isString(),
	body('description').optional().isString(),
	body('company').optional().isMongoId(),
	body('branch').optional().isMongoId(),
	body('is_active').optional().isBoolean(),
], async (req,res)=>{
	if (!v(req,res)) return
	const doc = await AccountGroup.create(req.body)
	res.status(201).json(doc)
})

// Read one
r.get('/account-groups/:id', auth, [param('id').isMongoId()], async (req,res)=>{
	if (!v(req,res)) return
	const doc = await AccountGroup.findById(req.params.id)
	if (!doc) return res.status(404).json({ error:'Not found' })
	res.json(doc)
})

// Update
r.put('/account-groups/:id', auth, [
	param('id').isMongoId(),
	body('name').optional().isString(),
	body('code').optional().isString(),
	body('description').optional().isString(),
	body('company').optional().isMongoId(),
	body('branch').optional().isMongoId(),
	body('is_active').optional().isBoolean(),
], async (req,res)=>{
	if (!v(req,res)) return
	const doc = await AccountGroup.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
	if (!doc) return res.status(404).json({ error:'Not found' })
	res.json(doc)
})

// Delete
r.delete('/account-groups/:id', auth, [param('id').isMongoId()], async (req,res)=>{
	if (!v(req,res)) return
	const out = await AccountGroup.findByIdAndDelete(req.params.id)
	if (!out) return res.status(404).json({ error:'Not found' })
	res.json({ ok: true })
})

// Bulk delete
r.delete('/account-groups', auth, [body('ids').isArray({ min:1 })], async (req,res)=>{
	if (!v(req,res)) return
	await AccountGroup.deleteMany({ _id: { $in: req.body.ids } })
	res.json({ ok: true })
})

export default r
