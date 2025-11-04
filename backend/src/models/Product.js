import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true },
  images: [{ type: String }],
  rating: {
    avg: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 },
  },
  stock: { type: Number, default: 100 },
}, { timestamps: true })

ProductSchema.index({ title: 'text', slug: 'text' })

export default mongoose.model('Product', ProductSchema)
