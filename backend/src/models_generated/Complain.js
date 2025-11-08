import mongoose from 'mongoose'
const { Schema } = mongoose

const ComplainSchema = new Schema({
  id: { type: Number }, // id int(11)
  customerid: { type: Number }, // customerid int(11)
  complaindatetime: { type: Date }, // complaindatetime datetime
  product: { type: String }, // product varchar(255)
  employee: { type: Number }, // employee int(11)
  remark: { type: String }, // remark text
  status: { type: String }, // status varchar(25)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  entrytype: { type: String }, // entrytype varchar(20)
  assignedby: { type: String }, // assignedby varchar(25)
  state: { type: String }, // state varchar(100)
  typeField: { type: String }, // type varchar(20)
  serialno: { type: String }, // serialno varchar(50)
  mobile: { type: String }, // mobile varchar(50)
  clientsign: { type: String }, // clientsign text
  customercomments: { type: String }, // customercomments text
  requirement: { type: String }, // requirement varchar(255)
  srating: { type: String }, // srating varchar(255)
  prating: { type: String }, // prating varchar(255)
  manager: { type: Number }, // manager int(11)
  sms1: { type: String }, // sms1 varchar(25)
  sms2: { type: String }, // sms2 varchar(25)
  charges: { type: String }, // charges varchar(20)
  assigndate: { type: Date }, // assigndate date
  assignperson: { type: String }, // assignperson varchar(25)
  address: { type: String }, // address text
  contactperson: { type: String }, // contactperson varchar(255)
  acharges: { type: Number }, // acharges decimal(15
  complaintypeid: { type: Number }, // complaintypeid int(11)
  machineid: { type: Number }, // machineid int(11)
  closeremarks: { type: String }, // closeremarks varchar(255)
  workcode: { type: String }, // workcode varchar(150)
}, { timestamps: false })

export default mongoose.model('Complain', ComplainSchema, 'complain')
