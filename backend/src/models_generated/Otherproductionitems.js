import mongoose from 'mongoose'
const { Schema } = mongoose

const OtherproductionitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  otherproductionid: { type: Number }, // otherproductionid int(11)
  pid: { type: Number }, // pid int(11)
  code: { type: String }, // code varchar(50)
  mfgdte: { type: String }, // mfgdte text
  expdte: { type: String }, // expdte text
  batchqty: { type: String }, // batchqty text
  batchno: { type: String }, // batchno text
  qty: { type: Number }, // qty decimal(15
  unit: { type: Number }, // unit int(11)
  rate: { type: Number }, // rate decimal(15
  amount: { type: Number }, // amount decimal(15
  revision: { type: Number }, // revision int(11)
  adminrate: { type: Number }, // adminrate int(11)
}, { timestamps: false })

export default mongoose.model('Otherproductionitems', OtherproductionitemsSchema, 'otherproductionitems')
