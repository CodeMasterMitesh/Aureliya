import mongoose from 'mongoose'
const { Schema } = mongoose

const PurchaseindentitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  indentid: { type: Number }, // indentid int(11)
  mid: { type: Number }, // mid int(11)
  qty: { type: Number }, // qty float
  description: { type: String }, // description text
  typeField: { type: String }, // type varchar(50)
  grade: { type: String }, // grade varchar(50)
  packsize: { type: String }, // packsize varchar(50)
  batchno: { type: String }, // batchno varchar(50)
  traceability: { type: String }, // traceability varchar(50)
  make: { type: String }, // make varchar(255)
  caseno: { type: String }, // caseno varchar(100)
  priority: { type: String }, // priority varchar(255)
  justification: { type: String }, // justification varchar(255)
  status: { type: String }, // status varchar(255)
}, { timestamps: false })

export default mongoose.model('Purchaseindentitems', PurchaseindentitemsSchema, 'purchaseindentitems')
