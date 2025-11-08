import mongoose from 'mongoose'
const { Schema } = mongoose

const LeaditemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  qty: { type: Number }, // qty decimal(15
  desci: { type: String }, // desci varchar(200)
  rate: { type: Number }, // rate decimal(15
  position: { type: Number }, // position int(11)
  leadid: { type: Number }, // leadid int(11)
  amount: { type: Number }, // amount decimal(15
  tid: { type: Number }, // tid int(11)
  productname: { type: String }, // productname varchar(100)
  testname: { type: String }, // testname varchar(100)
}, { timestamps: false })

export default mongoose.model('Leaditems', LeaditemsSchema, 'leaditems')
