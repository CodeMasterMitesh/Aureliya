import mongoose from 'mongoose'
const { Schema } = mongoose

const QuotationitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  quotationid: { type: Number }, // quotationid int(11)
  samplename: { type: String }, // samplename varchar(255)
  testrequired: { type: String }, // testrequired text
  method: { type: String }, // method varchar(255)
  particulars: { type: String }, // particulars varchar(255)
  possibility: { type: String }, // possibility varchar(255)
  total: { type: Number }, // total float
  firstsample: { type: Number }, // firstsample float
  sampleinraw: { type: Number }, // sampleinraw float
  samplepreparation: { type: Number }, // samplepreparation float
  remarks: { type: String }, // remarks text
  pid: { type: Number }, // pid int(11)
  qty: { type: Number }, // qty int(11)
  inquiryid: { type: Number }, // inquiryid int(11)
  rate: { type: Number }, // rate float
}, { timestamps: false })

export default mongoose.model('Quotationitems', QuotationitemsSchema, 'quotationitems')
