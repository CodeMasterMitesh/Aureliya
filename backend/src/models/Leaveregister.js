import mongoose from 'mongoose'
const { Schema } = mongoose

const LeaveRegisterSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  leave_type: { type: String, enum: ['cl', 'sl', 'pl', 'lop', 'other'], default: 'other' },
  from_date: { type: Date, required: true },
  to_date: { type: Date, required: true },
  days: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending', index: true },
  approver: { type: Schema.Types.ObjectId, ref: 'User' },
  reason: { type: String, trim: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true })

LeaveRegisterSchema.index({ user: 1, from_date: -1 })
LeaveRegisterSchema.index({ company: 1, branch: 1, status: 1 })

export default mongoose.model('LeaveRegister', LeaveRegisterSchema)
