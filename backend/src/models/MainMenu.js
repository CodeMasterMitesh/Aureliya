import mongoose from 'mongoose'

const MainMenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true, index: true },
    icon: { type: String },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
)

export default mongoose.model('MainMenu', MainMenuSchema)
