import mongoose from 'mongoose'
const { Schema } = mongoose

const TestrequestslipitemsSchema = new Schema({
  requestid: { type: Number }, // requestid int(11)
  pid: { type: Number }, // pid int(11)
  name: { type: String }, // name varchar(50)
  supplier: { type: String }, // supplier varchar(50)
  qty: { type: Number }, // qty float
  licno: { type: String }, // licno varchar(50)
  batchno: { type: String }, // batchno varchar(50)
  mfgdate: { type: Date }, // mfgdate date
  expdate: { type: Date }, // expdate date
  testrequired: { type: String }, // testrequired varchar(50)
  specification: { type: String }, // specification varchar(50)
  remarks: { type: String }, // remarks varchar(50)
  id: { type: Number }, // id int(11)
  batchsize: { type: String }, // batchsize varchar(50)
  sampleqty: { type: Number }, // sampleqty int(11)
  testasper: { type: String }, // testasper varchar(50)
  parameters: { type: String }, // parameters varchar(50)
}, { timestamps: false })

export default mongoose.model('Testrequestslipitems', TestrequestslipitemsSchema, 'testrequestslipitems')
