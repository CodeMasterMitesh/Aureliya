import Joi from 'joi'

export const productCreateSchema = Joi.object({
  title: Joi.string().min(1).max(256).required(),
  slug: Joi.string().min(1).max(256).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().hex().length(24).optional(),
  images: Joi.array().items(Joi.string().uri()).default([]),
  sku: Joi.string().max(128).allow(null,''),
  unit: Joi.string().max(32).allow(null,''),
  hsn_code: Joi.string().max(32).allow(null,''),
  gst_rate: Joi.number().min(0).max(100).default(0),
  mrp: Joi.number().min(0).optional(),
  purchase_price: Joi.number().min(0).optional(),
  company: Joi.string().hex().length(24).allow(null,''),
  branch: Joi.string().hex().length(24).allow(null,''),
})

export const productUpdateSchema = productCreateSchema.fork(['title','slug','price'], f => f.optional())
