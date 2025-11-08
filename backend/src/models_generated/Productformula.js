import mongoose from 'mongoose'
const { Schema } = mongoose

const ProductformulaSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  rpm: { type: String }, // rpm varchar(50)
  materialname: { type: String }, // materialname varchar(255)
  size: { type: String }, // size varchar(50)
  color: { type: String }, // color varchar(50)
  code: { type: String }, // code varchar(50)
  uom: { type: String }, // uom varchar(50)
  qty: { type: String }, // qty varchar(50)
}, { timestamps: false })

export default mongoose.model('Productformula', ProductformulaSchema, 'productformula')
