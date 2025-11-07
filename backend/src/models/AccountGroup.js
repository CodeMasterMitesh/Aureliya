import mongoose from 'mongoose'

const AccountGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    code: { type: String, trim: true },
    description: { type: String, trim: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', index: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

AccountGroupSchema.index({ name: 1, company: 1, branch: 1 }, { unique: false })

export default mongoose.model('AccountGroup', AccountGroupSchema)
