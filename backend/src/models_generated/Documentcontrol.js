import mongoose from 'mongoose'
const { Schema } = mongoose

const DocumentcontrolSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  name: { type: String }, // name varchar(100)
  title: { type: String }, // title varchar(100)
  typeField: { type: String }, // type varchar(100)
  revisionnumber: { type: String }, // revisionnumber varchar(100)
  effectivedate: { type: Date }, // effectivedate date
  author: { type: String }, // author varchar(100)
  approver: { type: String }, // approver varchar(100)
  department: { type: String }, // department varchar(100)
  category: { type: String }, // category varchar(100)
  documentstatus: { type: String }, // documentstatus varchar(100)
  expirydate: { type: Date }, // expirydate date
  bookingno: { type: Number }, // bookingno int(11)
}, { timestamps: false })

export default mongoose.model('Documentcontrol', DocumentcontrolSchema, 'documentcontrol')
