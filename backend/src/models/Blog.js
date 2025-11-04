import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: { type: String },
  content: { type: String },
  image: { type: String },
}, { timestamps: true })

export default mongoose.model('Blog', BlogSchema)
