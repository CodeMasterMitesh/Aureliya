import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialrequestSchema = new Schema({
  id: { type: Number }, // id int(11)
  materialrequestno: { type: String }, // materialrequestno varchar(20)
  requestdatetime: { type: Date }, // requestdatetime datetime
  customerid: { type: Number }, // customerid int(11)
  project: { type: Number }, // project int(11)
  area: { type: String }, // area varchar(255)
  customermobile: { type: String }, // customermobile varchar(255)
  customeremail: { type: String }, // customeremail varchar(255)
  requestby: { type: Number }, // requestby int(11)
  remarks: { type: String }, // remarks text
  purpose: { type: String }, // purpose enum('Sale'
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  entrytype: { type: String }, // entrytype varchar(20)
  requestfor: { type: String }, // requestfor varchar(15)
  godown: { type: Number }, // godown int(11)
  asperbom: { type: String }, // asperbom varchar(15)
  bomid: { type: Number }, // bomid int(11)
  bomqty: { type: Number }, // bomqty float
  instrumentstatus: { type: String }, // instrumentstatus varchar(20)
  instrumentsrno: { type: String }, // instrumentsrno varchar(20)
  approved: { type: String }, // approved varchar(20)
  costcenter: { type: Number }, // costcenter int(11)
  attachment: { type: String }, // attachment varchar(255)
  employeeid: { type: Number }, // employeeid int(11)
  state: { type: String }, // state varchar(20)
  mobile: { type: String }, // mobile varchar(20)
  approvedby: { type: Number }, // approvedby int(11)
  labname: { type: String }, // labname varchar(50)
  approved1: { type: String }, // approved1 varchar(20)
  approved2: { type: String }, // approved2 varchar(20)
  approveddatetime: { type: Date }, // approveddatetime datetime
  approved1datetime: { type: Date }, // approved1datetime datetime
  approved2datetime: { type: Date }, // approved2datetime datetime
  approvedby1: { type: Number }, // approvedby1 int(11)
  approvedby2: { type: Number }, // approvedby2 int(11)
  location: { type: Number }, // location int(11)
  productid: { type: Number }, // productid int(11)
  totalqty: { type: String }, // totalqty varchar(255)
  issuestatus: { type: String }, // issuestatus varchar(25)
  mpid: { type: Number }, // mpid int(11)
  auditremarks: { type: String }, // auditremarks varchar(25)
  complaintno: { type: String }, // complaintno varchar(25)
  att1: { type: String }, // att1 varchar(255)
  att2: { type: String }, // att2 varchar(255)
  att3: { type: String }, // att3 varchar(255)
  att4: { type: String }, // att4 varchar(255)
  att5: { type: String }, // att5 varchar(255)
  mainrevision: { type: Number }, // mainrevision int(11)
}, { timestamps: false })

export default mongoose.model('Materialrequest', MaterialrequestSchema, 'materialrequest')
