import mongoose from 'mongoose'
const { Schema } = mongoose

const ShiftMasterSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  code: { type: String, trim: true, index: true },
  start_time: { type: String, required: true }, // HH:mm
  end_time: { type: String, required: true },   // HH:mm
  grace_minutes: { type: Number, default: 0 },
  break_minutes: { type: Number, default: 0 },
  is_night: { type: Boolean, default: false },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true })

ShiftMasterSchema.index({ company: 1, branch: 1, name: 1 }, { unique: true, partialFilterExpression: { company: { $exists: true }, branch: { $exists: true } } })

export default mongoose.model('Shiftmaster', ShiftMasterSchema)
