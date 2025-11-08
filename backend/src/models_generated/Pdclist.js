import mongoose from 'mongoose'
const { Schema } = mongoose

const PdclistSchema = new Schema({
  id: { type: Number }, // id int(11)
  client: { type: Number }, // client int(11)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  date: { type: Date }, // date date
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  bankname: { type: String }, // bankname varchar(255)
  branchname: { type: String }, // branchname varchar(255)
  remarks: { type: String }, // remarks varchar(255)
  amount: { type: Number }, // amount decimal(15
  action: { type: String }, // action varchar(255)
  billno: { type: String }, // billno varchar(255)
  branch: { type: Number }, // branch int(11)
  auditremarks: { type: String }, // auditremarks varchar(255)
}, { timestamps: false })

export default mongoose.model('Pdclist', PdclistSchema, 'pdclist')
