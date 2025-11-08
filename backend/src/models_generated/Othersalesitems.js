import mongoose from 'mongoose'
const { Schema } = mongoose

const OthersalesitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  othersaleid: { type: Number }, // othersaleid int(11)
  pid: { type: String }, // pid varchar(255)
  qty: { type: String }, // qty varchar(255)
  rate: { type: String }, // rate varchar(255)
  taxrate: { type: String }, // taxrate varchar(255)
  disc: { type: Number }, // disc float
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
  description: { type: String }, // description varchar(255)
  hsncode: { type: String }, // hsncode varchar(255)
  ledgerid: { type: Number }, // ledgerid int(11)
  type2: { type: String }, // type2 varchar(50)
  unit: { type: Number }, // unit int(11)
  gross: { type: Number }, // gross float
  typedisc: { type: String }, // typedisc varchar(50)
  cgstper: { type: Number }, // cgstper int(11)
  sgstper: { type: Number }, // sgstper int(11)
  igstper: { type: Number }, // igstper int(11)
  cgst: { type: Number }, // cgst float
  sgst: { type: Number }, // sgst float
  igst: { type: Number }, // igst float
  netamount: { type: Number }, // netamount float
}, { timestamps: false })

export default mongoose.model('Othersalesitems', OthersalesitemsSchema, 'othersalesitems')
