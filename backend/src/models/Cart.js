import mongoose from 'mongoose'

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, default: 1, min: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
)

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
)

export default mongoose.model('Cart', CartSchema)
