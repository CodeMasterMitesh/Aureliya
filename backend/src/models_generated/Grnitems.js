import mongoose from 'mongoose'
const { Schema } = mongoose

const GrnitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  grnid: { type: Number }, // grnid int(11)
  pid: { type: Number }, // pid int(11)
  revision: { type: Number }, // revision int(11)
  qty: { type: String }, // qty varchar(11)
  rate: { type: Number }, // rate decimal(15
  disc: { type: Number }, // disc float
  typedisc: { type: String }, // typedisc varchar(25)
  netamount: { type: Number }, // netamount float
  gtotal: { type: Number }, // gtotal float
  status: { type: String }, // status varchar(255)
  material: { type: Number }, // material int(11)
  batchno: { type: String }, // batchno text
  mid: { type: String }, // mid varchar(255)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  unit: { type: Number }, // unit int(11)
  code: { type: String }, // code varchar(20)
  rejectqty: { type: String }, // rejectqty varchar(255)
  originalqty: { type: String }, // originalqty varchar(255)
  rejectremarks: { type: String }, // rejectremarks varchar(255)
  sgstper: { type: Number }, // sgstper float
  sgst: { type: Number }, // sgst float
  cgstper: { type: Number }, // cgstper float
  cgst: { type: Number }, // cgst float
  igstper: { type: Number }, // igstper float
  igst: { type: Number }, // igst float
  roff: { type: Number }, // roff float
  amount: { type: Number }, // amount int(11)
  gross: { type: Number }, // gross decimal(15
  make: { type: String }, // make varchar(255)
  sampleqty: { type: String }, // sampleqty varchar(255)
  totalqty: { type: Number }, // totalqty float
  no: { type: Number }, // no float
  taxamount: { type: Number }, // taxamount float
  godown: { type: Number }, // godown int(11)
  arno: { type: String }, // arno varchar(255)
  poqty: { type: Number }, // poqty float
  branchstate: { type: String }, // branchstate varchar(255)
  supplierstate: { type: String }, // supplierstate varchar(255)
  binno: { type: String }, // binno varchar(50)
  gstper: { type: Number }, // gstper float
  packsize: { type: String }, // packsize varchar(50)
  expirydate: { type: Date }, // expirydate date
  expdte: { type: String }, // expdte text
  mfgdte: { type: String }, // mfgdte text
  batchqty: { type: String }, // batchqty text
  batchfreeqty: { type: String }, // batchfreeqty text
  poid: { type: String }, // poid varchar(255)
  srno: { type: String }, // srno varchar(50)
  locationname: { type: String }, // locationname varchar(255)
  dimensions: { type: String }, // dimensions varchar(255)
  materialused: { type: String }, // materialused varchar(255)
  packing: { type: String }, // packing varchar(255)
  qrcode: { type: String }, // qrcode varchar(50)
  hsncode: { type: String }, // hsncode varchar(25)
}, { timestamps: false })

export default mongoose.model('Grnitems', GrnitemsSchema, 'grnitems')
