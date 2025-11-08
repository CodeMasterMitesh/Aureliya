import mongoose from 'mongoose'
const { Schema } = mongoose

const AttendanceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: Date, required: true },
  check_in: { type: Date },
  check_out: { type: Date },
  shift: { type: Schema.Types.ObjectId, ref: 'Shiftmaster' },
  status: { type: String, enum: ['present', 'absent', 'leave', 'half_day', 'holiday'], default: 'present' },
  source: { type: String, enum: ['manual', 'biometric', 'import'], default: 'manual' },
  notes: { type: String, trim: true }
}, { timestamps: true })

AttendanceSchema.index({ user: 1, date: 1 }, { unique: true })
AttendanceSchema.index({ date: 1, status: 1 })

export default mongoose.model('Attendance', AttendanceSchema)
