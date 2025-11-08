import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialindentSchema = new Schema({
  id: { type: Number }, // id int(11)
  indentno: { type: String }, // indentno varchar(30)
  materialrequestno: { type: Number }, // materialrequestno int(11)
  indentdatetime: { type: Date }, // indentdatetime datetime
  customerid: { type: Number }, // customerid int(11)
  materialrequestid: { type: Number }, // materialrequestid int(11)
  indentby: { type: Number }, // indentby int(11)
  remark: { type: String }, // remark text
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  typeField: { type: String }, // type varchar(255)
  approved: { type: String }, // approved varchar(20)
  costcenter: { type: Number }, // costcenter int(11)
  supplier: { type: Number }, // supplier int(11)
  totalqty: { type: Number }, // totalqty decimal(15
  status: { type: String }, // status varchar(20)
  auditremarks: { type: String }, // auditremarks text
}, { timestamps: false })

export default mongoose.model('Materialindent', MaterialindentSchema, 'materialindent')
