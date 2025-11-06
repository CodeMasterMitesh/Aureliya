import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import Ledger from '../models/Ledger.js'
import AccountGroup from '../models/AccountGroup.js'
import Company from '../models/Company.js'
import Branch from '../models/Branch.js'
import User from '../models/User.js'
import { auth } from '../middleware/auth.js'

const r = Router()

function v(req,res){
	const e = validationResult(req)
	if (!e.isEmpty()) { res.status(400).json({ errors: e.array() }); return false }
	return true
}

// List ledgers with pagination and filters
r.get('/ledgers', auth, [
	query('page').optional().isInt({ min:1 }),
	query('limit').optional().isInt({ min:1, max:200 }),
	query('search').optional().isString(),
	query('company').optional().isMongoId(),
	query('branch').optional().isMongoId(),
	query('account_group_id').optional().isMongoId(),
	query('is_active').optional().isBoolean(),
], async (req,res)=>{
	if (!v(req,res)) return
	const page = parseInt(req.query.page||'1')
	const limit = parseInt(req.query.limit||'20')
	const { search, company, branch, account_group_id, is_active } = req.query
	const q = {}
	if (search) q.$or = [ { title: { $regex: search, $options:'i' } }, { account_group_name: { $regex: search, $options:'i' } } ]
	if (company) q.company = company
	if (branch) q.branch = branch
	if (account_group_id) q.account_group_id = account_group_id
	if (typeof is_active !== 'undefined') q.is_active = is_active === 'true'
	const [items, total] = await Promise.all([
		Ledger.find(q).sort({ title:1 }).skip((page-1)*limit).limit(limit).lean(),
		Ledger.countDocuments(q)
	])
	res.json({ items, total, page, pages: Math.ceil(total/limit) })
})

// Create ledger
r.post('/ledgers', auth, [
	body('title').isString().notEmpty(),
	body('account_group_id').optional().isMongoId(),
	body('company').optional().isMongoId(),
	body('branch').optional().isMongoId(),
	body('email').optional().isEmail(),
	body('tds_percentage').optional().isNumeric(),
	body('credit_period_days').optional().isNumeric(),
], async (req,res)=>{
	if (!v(req,res)) return
		const payload = { ...req.body }
	// Derive account_group_name if id provided
	if (payload.account_group_id){
		const ag = await AccountGroup.findById(payload.account_group_id).lean()
		payload.account_group_name = ag?.name || payload.account_group_name
	}
		// Derive company_name / branch_name if provided
		if (payload.company){
			const c = await Company.findById(payload.company).lean()
			if (c) payload.company_name = c.name
		}
		if (payload.branch){
			const b = await Branch.findById(payload.branch).lean()
			if (b) payload.branch_name = b.name
		}
	const doc = await Ledger.create(payload)
		// Update existing user snapshot if email matches
		if (doc.email){
			const existing = await User.findOne({ email: doc.email })
			if (existing){
				const ledgerSnap = {
					ledger_ref: doc._id,
					title: doc.title,
					account_group_id: doc.account_group_id,
					account_group_name: doc.account_group_name,
					ledger_type: doc.ledger_type,
					category: doc.category,
					gstin: doc.gstin,
					pan_no: doc.pan_no,
					is_active: doc.is_active,
					updated_at: new Date(),
				}
				if (!existing.company && doc.company) existing.company = doc.company
				if (!existing.branch && doc.branch) existing.branch = doc.branch
				existing.ledger = ledgerSnap
				await existing.save()
			}
		}
	res.status(201).json(doc)
})

// Get one
r.get('/ledgers/:id', auth, [param('id').isMongoId()], async (req,res)=>{
	if (!v(req,res)) return
	const doc = await Ledger.findById(req.params.id)
	if (!doc) return res.status(404).json({ error:'Not found' })
	res.json(doc)
})

// Update ledger
r.put('/ledgers/:id', auth, [
	param('id').isMongoId(),
	body('title').optional().isString(),
	body('account_group_id').optional().isMongoId(),
	body('company').optional().isMongoId(),
	body('branch').optional().isMongoId(),
	body('email').optional().isEmail(),
	body('tds_percentage').optional().isNumeric(),
	body('credit_period_days').optional().isNumeric(),
], async (req,res)=>{
	if (!v(req,res)) return
		const payload = { ...req.body }
	if (payload.account_group_id){
		const ag = await AccountGroup.findById(payload.account_group_id).lean()
		if (ag) payload.account_group_name = ag.name
	}
		if (payload.company){
			const c = await Company.findById(payload.company).lean()
			if (c) payload.company_name = c.name
		}
		if (payload.branch){
			const b = await Branch.findById(payload.branch).lean()
			if (b) payload.branch_name = b.name
		}
	const doc = await Ledger.findByIdAndUpdate(req.params.id, { $set: payload }, { new: true })
	if (!doc) return res.status(404).json({ error:'Not found' })
		// Sync user snapshot if any
		if (doc.email){
			const existing = await User.findOne({ email: doc.email })
			if (existing){
				const ledgerSnap = {
					ledger_ref: doc._id,
					title: doc.title,
					account_group_id: doc.account_group_id,
					account_group_name: doc.account_group_name,
					ledger_type: doc.ledger_type,
					category: doc.category,
					gstin: doc.gstin,
					pan_no: doc.pan_no,
					is_active: doc.is_active,
					updated_at: new Date(),
				}
				if (!existing.company && doc.company) existing.company = doc.company
				if (!existing.branch && doc.branch) existing.branch = doc.branch
				existing.ledger = ledgerSnap
				await existing.save()
			}
		}
	res.json(doc)
})

// Delete ledger
r.delete('/ledgers/:id', auth, [param('id').isMongoId()], async (req,res)=>{
	if (!v(req,res)) return
	const out = await Ledger.findByIdAndDelete(req.params.id)
	if (!out) return res.status(404).json({ error:'Not found' })
	res.json({ ok: true })
})

// Bulk delete ledgers
r.delete('/ledgers', auth, [body('ids').isArray({ min:1 })], async (req,res)=>{
	if (!v(req,res)) return
	await Ledger.deleteMany({ _id: { $in: req.body.ids } })
	res.json({ ok: true })
})

export default r
