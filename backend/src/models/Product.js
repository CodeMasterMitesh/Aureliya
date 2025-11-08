import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true },
    images: [{ type: String }],
    // ERP alignment (optional fields)
    sku: { type: String, unique: true, sparse: true, index: true },
    unit: { type: String },
    hsn_code: { type: String },
    gst_rate: { type: Number, default: 0 },
    mrp: { type: Number },
    purchase_price: { type: Number },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', index: true },
    rating: {
      avg: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
)

ProductSchema.index({ title: 'text', slug: 'text' })
ProductSchema.index({ company: 1, sku: 1 }, { unique: false, sparse: true })

export default mongoose.model('Product', ProductSchema)
