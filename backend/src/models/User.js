import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const AddressSchema = new mongoose.Schema(
  {
    label: { type: String, default: 'Home' },
    line1: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, default: 'India' },
    phone: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true, timestamps: false }
)

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, trim: true, unique: true, sparse: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'employee', 'admin'], default: 'user', index: true },
    type: {
      type: String,
      enum: [
        'customer',
        'employee',
        'admin',
        'super_admin',
        'supplier',
        'bank',
        'cash',
        'other'
      ],
      default: 'customer',
      index: true,
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    profileImage: { type: String },
    addresses: [AddressSchema],
    // --- Employee core profile (for HR) ---
    employee: {
      code: { type: String, trim: true }, // internal employee code
      designation: { type: String, trim: true },
      department: { type: String, trim: true },
      shift: { type: mongoose.Schema.Types.ObjectId, ref: 'Shiftmaster' },
      join_date: { type: Date },
      resign_date: { type: Date },
      status: { type: String, enum: ['active', 'inactive', 'resigned', 'on_leave'], default: 'active', index: true },
      reporting_manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      pan: { type: String, trim: true },
      aadhaar: { type: String, trim: true },
      passport_no: { type: String, trim: true },
      blood_group: { type: String, trim: true },
      emergency_contact_name: { type: String, trim: true },
      emergency_contact_phone: { type: String, trim: true },
    },
    // Optional embedded ledger info snapshot (denormalized for quick access)
    ledger: {
      ledger_ref: { type: mongoose.Schema.Types.ObjectId, ref: 'Ledger' },
      title: { type: String, trim: true },
      account_group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountGroup' },
      account_group_name: { type: String, trim: true },
      ledger_type: { type: String, trim: true },
      category: { type: String, trim: true },
      alias_name: { type: String, trim: true },
      registration_type: { type: String, trim: true },
      gstin: { type: String, trim: true },
      pan_no: { type: String, trim: true },
      birth_date: { type: Date },
      swift_code: { type: String, trim: true },
      ifsc_code: { type: String, trim: true },
      bank_name: { type: String, trim: true },
      branch_name: { type: String, trim: true },
      account_no: { type: String, trim: true },
      tan_no: { type: String, trim: true },
      country: { type: String, trim: true },
      tds_percentage: { type: Number, default: 0 },
      address_line1: { type: String, trim: true },
      address_line2: { type: String, trim: true },
      address_line3: { type: String, trim: true },
      address_line4: { type: String, trim: true },
      address_line5: { type: String, trim: true },
      area: { type: String, trim: true },
      city: { type: String, trim: true },
      pincode: { type: String, trim: true },
      state: { type: String, trim: true },
      contact_person_name: { type: String, trim: true },
      contact_person_number: { type: String, trim: true },
      credit_period_days: { type: Number, default: 0 },
      is_rcm_applicable: { type: Boolean, default: false },
      is_msme_registered: { type: Boolean, default: false },
      attachments: [{ type: String }],
      mobile_no: { type: String, trim: true },
      is_active: { type: Boolean, default: true },
      updated_at: { type: Date },
    },
  },
  { timestamps: true }
)

// Indexes for frequent HR queries
UserSchema.index({ 'employee.code': 1 }, { sparse: true })
UserSchema.index({ 'employee.status': 1, company: 1 })

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.model('User', UserSchema)
