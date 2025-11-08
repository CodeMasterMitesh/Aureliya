import mongoose from 'mongoose'
const { Schema } = mongoose

const LeaveregisterSchema = new Schema({
  id: { type: Number }, // id int(11)
  uid: { type: Number }, // uid int(11)
  month: { type: String }, // month varchar(10)
  year: { type: String }, // year varchar(10)
  clopbal: { type: Number }, // clopbal int(11)
  plopbal: { type: Number }, // plopbal int(11)
  addcl: { type: Number }, // addcl int(11)
  total: { type: Number }, // total int(11)
  leave: { type: Number }, // leave int(11)
  used: { type: Number }, // used int(11)
  lwp: { type: Number }, // lwp int(11)
  balcl: { type: Number }, // balcl int(11)
  balpl: { type: Number }, // balpl int(11)
}, { timestamps: false })

export default mongoose.model('Leaveregister', LeaveregisterSchema, 'leaveregister')
