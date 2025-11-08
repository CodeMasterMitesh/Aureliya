import mongoose from 'mongoose'
const { Schema } = mongoose

// Unified ERP + LIMS transaction (voucher, sales order, purchase order, invoice, lab booking)
// Polymorphic 'kind' guides required fields at service layer.
const LineSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  description: { type: String },
  qty: { type: Number, required: true, min: 0 },
  unit: { type: String },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0 },
  tax_rate: { type: Number, default: 0 },
  total: { type: Number, required: true, min: 0 },
}, { _id: false })

const ChargeSchema = new Schema({
  label: { type: String, required: true },
  amount: { type: Number, required: true },
  kind: { type: String, enum: ['tax','shipping','packing','other'], default: 'other' }
}, { _id: false })

const TransactionSchema = new Schema({
  kind: { type: String, required: true, enum: ['sales_order','purchase_order','voucher','invoice','payment','receipt','journal','lab_booking'] },
  number: { type: String, index: true }, // external or generated number
  company: { type: Schema.Types.ObjectId, ref: 'Company', index: true },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', index: true },
  date: { type: Date, required: true, index: true },
  party: { type: Schema.Types.ObjectId, ref: 'User' }, // customer/supplier/bank/cash depending on kind
  account_group: { type: Schema.Types.ObjectId, ref: 'AccountGroup' },
  lines: [LineSchema],
  charges: [ChargeSchema],
  currency: { type: String, default: 'INR' },
  exchange_rate: { type: Number, default: 1 },
  subtotal: { type: Number, required: true },
  discount_total: { type: Number, default: 0 },
  tax_total: { type: Number, default: 0 },
  grand_total: { type: Number, required: true },
  status: { type: String, enum: ['draft','pending','approved','partially_paid','paid','cancelled'], default: 'draft', index: true },
  reference: { type: String },
  notes: { type: String },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  approved_by: { type: Schema.Types.ObjectId, ref: 'User' },
  booking_ref: { type: Schema.Types.ObjectId, ref: 'Bookings' }, // lab booking link if any
}, { timestamps: true })

TransactionSchema.index({ kind: 1, date: -1 })
TransactionSchema.index({ party: 1, date: -1 })
TransactionSchema.index({ company: 1, branch: 1, date: -1 })

export default mongoose.model('Transaction', TransactionSchema)
