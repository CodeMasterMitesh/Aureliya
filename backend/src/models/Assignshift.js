import mongoose from 'mongoose'
const { Schema } = mongoose

const AssignShiftSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  shift: { type: Schema.Types.ObjectId, ref: 'Shiftmaster', required: true },
  valid_from: { type: Date, required: true },
  valid_to: { type: Date },
  assigned_by: { type: Schema.Types.ObjectId, ref: 'User' },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true })

AssignShiftSchema.index({ user: 1, valid_from: -1 })
AssignShiftSchema.index({ shift: 1 })

export default mongoose.model('AssignShift', AssignShiftSchema)
