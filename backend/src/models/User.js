import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const AddressSchema = new mongoose.Schema({
  label: { type: String, default: 'Home' },
  line1: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, default: 'India' },
  phone: { type: String },
  isDefault: { type: Boolean, default: false },
}, { _id: true, timestamps: false })

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, trim: true, unique: true, sparse: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'employee', 'admin'], default: 'user', index: true },
  type: { type: String, enum: ['customer', 'employee', 'admin', 'super_admin'], default: 'customer', index: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  profileImage: { type: String },
  addresses: [AddressSchema],
  // Optional embedded ledger info snapshot (denormalized for quick access)
  ledger: {
    ledger_ref: { type: mongoose.Schema.Types.ObjectId, ref: 'Ledger' },
    title: { type: String, trim: true },
    account_group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountGroup' },
    account_group_name: { type: String, trim: true },
    ledger_type: { type: String, trim: true },
    category: { type: String, trim: true },
    gstin: { type: String, trim: true },
    pan_no: { type: String, trim: true },
    is_active: { type: Boolean, default: true },
    updated_at: { type: Date },
  },
}, { timestamps: true })

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.model('User', UserSchema)
