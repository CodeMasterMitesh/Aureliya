import mongoose from 'mongoose'
const { Schema } = mongoose

const StockregisterSchema = new Schema({
  id: { type: Number }, // id int(11)
  chemicalcode: { type: String }, // chemicalcode varchar(100)
  chemicalname: { type: String }, // chemicalname varchar(255)
  companymake: { type: String }, // companymake varchar(255)
  grade: { type: String }, // grade varchar(100)
  packsize: { type: String }, // packsize varchar(100)
  qty: { type: Number }, // qty int(11)
  batchno: { type: String }, // batchno varchar(100)
  receivedate: { type: Date }, // receivedate datetime
  issuedate: { type: Date }, // issuedate datetime
  issueto: { type: String }, // issueto varchar(255)
  issueqty: { type: Number }, // issueqty int(11)
  openingstock: { type: String }, // openingstock varchar(100)
  closingstock: { type: String }, // closingstock varchar(100)
  expdate: { type: Date }, // expdate datetime
  usebefore: { type: String }, // usebefore varchar(255)
  total: { type: Number }, // total float
  remarks: { type: String }, // remarks text
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Stockregister', StockregisterSchema, 'stockregister')
