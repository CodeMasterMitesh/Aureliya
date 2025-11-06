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
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  profileImage: { type: String },
  addresses: [AddressSchema],
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
