import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialissueSchema = new Schema({
  id: { type: Number }, // id int(11)
  issueno: { type: String }, // issueno varchar(50)
  customerid: { type: Number }, // customerid int(11)
  project: { type: Number }, // project int(11)
  remark: { type: String }, // remark varchar(255)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  issuedatetime: { type: Date }, // issuedatetime datetime
  requestby: { type: Number }, // requestby int(11)
  typeField: { type: String }, // type varchar(255)
  materialrequestno: { type: Number }, // materialrequestno int(11)
  issueby: { type: Number }, // issueby int(11)
  binno: { type: String }, // binno varchar(50)
  requestfor: { type: String }, // requestfor varchar(25)
  fromgodown: { type: Number }, // fromgodown int(11)
  frombranch: { type: Number }, // frombranch int(11)
  tobranch: { type: Number }, // tobranch int(11)
  togodown: { type: Number }, // togodown int(11)
  approved: { type: String }, // approved varchar(255)
  costcenter: { type: Number }, // costcenter int(11)
  instrumentstatus: { type: String }, // instrumentstatus varchar(50)
  instrumentsrno: { type: String }, // instrumentsrno varchar(50)
  dispatchthrough: { type: Number }, // dispatchthrough int(11)
  podno: { type: String }, // podno varchar(255)
  dispatchremarks: { type: String }, // dispatchremarks varchar(255)
  approvedby: { type: Number }, // approvedby int(11)
  ewaybill: { type: String }, // ewaybill varchar(20)
  total: { type: Number }, // total float
  branchstate: { type: String }, // branchstate varchar(50)
  customerstate: { type: String }, // customerstate varchar(50)
  subtotal: { type: Number }, // subtotal float
  totalcgst: { type: Number }, // totalcgst float
  totalsgst: { type: Number }, // totalsgst float
  totaligst: { type: Number }, // totaligst float
  roundoff: { type: Number }, // roundoff float
  purpose: { type: String }, // purpose enum('Sale'
  entrytype: { type: String }, // entrytype varchar(50)
  rateyesno: { type: String }, // rateyesno varchar(20)
  remarks: { type: String }, // remarks text
  employeeid: { type: Number }, // employeeid int(11)
  photo1: { type: String }, // photo1 varchar(255)
  photo2: { type: String }, // photo2 varchar(255)
  photo3: { type: String }, // photo3 varchar(255)
  photo4: { type: String }, // photo4 varchar(255)
  billfrom: { type: String }, // billfrom varchar(15)
  cancel: { type: String }, // cancel varchar(20)
  totalqty: { type: Number }, // totalqty decimal(15
  auditremarks: { type: String }, // auditremarks varchar(255)
  datetime: { type: Date }, // datetime datetime
  batchno: { type: Number }, // batchno int(11)
  issueto: { type: String }, // issueto varchar(150)
  salsrno: { type: Number }, // salsrno int(11)
  mid: { type: Number }, // mid int(11)
  chemist: { type: String }, // chemist varchar(50)
  qty: { type: Number }, // qty int(11)
}, { timestamps: false })

export default mongoose.model('Materialissue', MaterialissueSchema, 'materialissue')
