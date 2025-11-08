import Joi from 'joi'

const lineSchema = Joi.object({
  product: Joi.string().hex().length(24).allow(null),
  description: Joi.string().max(255).allow(null,''),
  qty: Joi.number().min(0).required(),
  unit: Joi.string().max(16).allow(null,''),
  price: Joi.number().min(0).required(),
  discount: Joi.number().min(0).optional(),
  tax_rate: Joi.number().min(0).max(100).optional(),
  total: Joi.number().min(0).required()
})

export const transactionCreateSchema = Joi.object({
  kind: Joi.string().valid('sales_order','purchase_order','voucher','invoice','payment','receipt','journal','lab_booking').required(),
  number: Joi.string().max(64).allow(null,''),
  date: Joi.date().required(),
  company: Joi.string().hex().length(24).allow(null),
  branch: Joi.string().hex().length(24).allow(null),
  party: Joi.string().hex().length(24).allow(null),
  lines: Joi.array().items(lineSchema).default([]),
  charges: Joi.array().items(Joi.object({
    label: Joi.string().max(64).required(),
    amount: Joi.number().min(0).required(),
    kind: Joi.string().valid('tax','shipping','packing','other').default('other')
  })).default([]),
  currency: Joi.string().max(8).default('INR'),
  exchange_rate: Joi.number().min(0).default(1),
  subtotal: Joi.number().min(0).required(),
  discount_total: Joi.number().min(0).default(0),
  tax_total: Joi.number().min(0).default(0),
  grand_total: Joi.number().min(0).required(),
  status: Joi.string().valid('draft','pending','approved','partially_paid','paid','cancelled').default('draft'),
  reference: Joi.string().max(128).allow(null,''),
  notes: Joi.string().max(2048).allow(null,'')
})

export const transactionUpdateSchema = transactionCreateSchema.fork(['kind','date','subtotal','grand_total'], f => f.optional())
