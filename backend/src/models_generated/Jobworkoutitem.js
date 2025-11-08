import mongoose from 'mongoose'
const { Schema } = mongoose

const JobworkoutitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  scid: { type: Number }, // scid int(11)
  pid: { type: Number }, // pid int(11)
  qty: { type: Number }, // qty float
  freeqty: { type: Number }, // freeqty int(11)
  rate: { type: Number }, // rate float
  total: { type: Number }, // total float
  availableqty: { type: Number }, // availableqty float
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  batchno: { type: String }, // batchno text
  cgstper: { type: Number }, // cgstper float
  sgstper: { type: Number }, // sgstper float
  igstper: { type: Number }, // igstper float
  cgst: { type: Number }, // cgst float
  sgst: { type: Number }, // sgst float
  igst: { type: Number }, // igst float
  netamount: { type: Number }, // netamount float
  taxamount: { type: Number }, // taxamount int(11)
  location: { type: Number }, // location int(11)
  amount: { type: Number }, // amount decimal(10
  expirydate: { type: Date }, // expirydate date
  gstper: { type: Number }, // gstper float
  batchfreeqty: { type: String }, // batchfreeqty text
  batchqty: { type: String }, // batchqty text
  expdte: { type: String }, // expdte text
  mfgdte: { type: String }, // mfgdte text
  effectiverate: { type: Number }, // effectiverate decimal(15
  srno: { type: String }, // srno varchar(255)
  description: { type: String }, // description varchar(255)
  disc: { type: Number }, // disc decimal(20
  typedisc: { type: String }, // typedisc varchar(10)
  soqty: { type: Number }, // soqty float
  handlingcharge: { type: Number }, // handlingcharge decimal(20
  handlingchargetypedisc: { type: String }, // handlingchargetypedisc varchar(10)
  egstper: { type: Number }, // egstper float
  ggstper: { type: Number }, // ggstper float
  exemptgstper: { type: Number }, // exemptgstper float
  cashdiscount: { type: Number }, // cashdiscount decimal(15
  unit: { type: Number }, // unit int(11)
}, { timestamps: false })

export default mongoose.model('Jobworkoutitem', JobworkoutitemSchema, 'jobworkoutitem')
