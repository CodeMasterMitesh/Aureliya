import mongoose from 'mongoose'

const BranchSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    address: { type: String },
    meta: { type: Object, default: {} },
  },
  { timestamps: true }
)

BranchSchema.index({ company: 1, name: 1 }, { unique: true })

export default mongoose.model('Branch', BranchSchema)
