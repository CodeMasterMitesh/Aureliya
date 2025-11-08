import mongoose from 'mongoose'

const { Schema } = mongoose

const EmployeeSalarySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  effective_from: { type: Date, required: true },
  basic: { type: Number, required: true },
  hra: { type: Number, default: 0 },
  allowances: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    taxable: { type: Boolean, default: true }
  }],
  deductions: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  ctc: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  is_active: { type: Boolean, default: true },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

EmployeeSalarySchema.index({ user: 1, effective_from: -1 })

export default mongoose.model('EmployeeSalary', EmployeeSalarySchema)
