import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialwastageitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  materialwastageid: { type: Number }, // materialwastageid int(11)
  pid: { type: Number }, // pid int(11)
  revision: { type: Number }, // revision int(11)
  qty: { type: Number }, // qty decimal(15
  wid: { type: Number }, // wid int(11)
  mrp: { type: Number }, // mrp float
  barcode: { type: String }, // barcode varchar(255)
  rate: { type: Number }, // rate decimal(15
  netamount: { type: Number }, // netamount decimal(15
  reason: { type: String }, // reason varchar(255)
  availqty: { type: String }, // availqty varchar(11)
  batchno: { type: String }, // batchno text
  code: { type: String }, // code varchar(50)
  batchqty: { type: String }, // batchqty text
  mfgdte: { type: String }, // mfgdte text
  expdte: { type: String }, // expdte text
}, { timestamps: false })

export default mongoose.model('Materialwastageitems', MaterialwastageitemsSchema, 'materialwastageitems')
