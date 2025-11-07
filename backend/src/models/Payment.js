import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['created', 'authorized', 'paid', 'failed', 'refunded'],
      default: 'created',
      index: true,
    },
    provider: { type: String, default: 'mock' },
    ref: { type: String },
    payload: { type: Object },
  },
  { timestamps: true }
)

export default mongoose.model('Payment', PaymentSchema)
