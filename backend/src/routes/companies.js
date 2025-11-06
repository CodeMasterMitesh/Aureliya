import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import Company from '../models/Company.js'
import Branch from '../models/Branch.js'

const r = Router()

function handleValidation(req, res){
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
}

// List companies
r.get('/companies', [
  query('search').optional().isString()
], async (req, res) => {
  handleValidation(req,res)
  const q = req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {}
  const items = await Company.find(q).sort({ name: 1 }).lean()
  res.json({ items })
})

// List branches by company
r.get('/companies/:id/branches', [param('id').isMongoId()], async (req, res) => {
  handleValidation(req,res)
  const items = await Branch.find({ company: req.params.id }).sort({ name: 1 }).lean()
  res.json({ items })
})

// Minimal CRUD (optional: for admin setup)
r.post('/companies', [body('name').isString().notEmpty()], async (req, res) => {
  handleValidation(req,res)
  const c = await Company.create(req.body)
  res.status(201).json(c)
})

r.post('/branches', [
  body('company').isMongoId(),
  body('name').isString().notEmpty()
], async (req, res) => {
  handleValidation(req,res)
  const b = await Branch.create(req.body)
  res.status(201).json(b)
})

export default r
