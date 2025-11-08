import mongoose from 'mongoose'
const { Schema } = mongoose

const SalesordercouponitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  sid: { type: Number }, // sid int(11)
  pid: { type: Number }, // pid int(11)
  qty: { type: Number }, // qty float
}, { timestamps: false })

export default mongoose.model('Salesordercouponitem', SalesordercouponitemSchema, 'salesordercouponitem')
