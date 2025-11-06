import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, trim: true, unique: true, sparse: true },
    address: { type: String },
    meta: { type: Object, default: {} },
  },
  { timestamps: true }
)

export default mongoose.model('Company', CompanySchema)
