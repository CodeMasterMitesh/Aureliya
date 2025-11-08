import mongoose from 'mongoose'
const { Schema } = mongoose

const WorkorderitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  woid: { type: Number }, // woid int(11)
  cat: { type: String }, // cat varchar(25)
  pid: { type: Number }, // pid int(11)
  size: { type: String }, // size varchar(255)
  qty: { type: String }, // qty varchar(255)
  stock: { type: String }, // stock varchar(255)
  rate: { type: String }, // rate varchar(255)
  amount: { type: String }, // amount varchar(255)
  category: { type: String }, // category varchar(255)
  mid: { type: Number }, // mid int(11)
}, { timestamps: false })

export default mongoose.model('Workorderitems', WorkorderitemsSchema, 'workorderitems')
