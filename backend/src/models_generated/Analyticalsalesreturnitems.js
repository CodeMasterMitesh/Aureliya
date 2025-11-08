import mongoose from 'mongoose'
const { Schema } = mongoose

const AnalyticalsalesreturnitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  saleid: { type: Number }, // saleid int(11)
  pid: { type: String }, // pid varchar(255)
  qty: { type: String }, // qty varchar(255)
  rate: { type: String }, // rate varchar(255)
  taxrate: { type: String }, // taxrate varchar(255)
  discount: { type: Number }, // discount float
  amount: { type: Number }, // amount float
  mrp: { type: Number }, // mrp float
  weight: { type: String }, // weight varchar(255)
  miscdiscount: { type: String }, // miscdiscount varchar(255)
  total: { type: Number }, // total float
  typeField: { type: String }, // type varchar(11)
  category: { type: String }, // category varchar(50)
  barcode: { type: String }, // barcode varchar(255)
  mid: { type: Number }, // mid int(11)
  nameofsample: { type: String }, // nameofsample varchar(255)
  reportno: { type: String }, // reportno varchar(255)
  batchno: { type: String }, // batchno varchar(255)
}, { timestamps: false })

export default mongoose.model('Analyticalsalesreturnitems', AnalyticalsalesreturnitemsSchema, 'analyticalsalesreturnitems')
