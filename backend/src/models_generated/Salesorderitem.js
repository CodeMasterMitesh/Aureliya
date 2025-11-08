import mongoose from 'mongoose'
const { Schema } = mongoose

const SalesorderitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  sid: { type: Number }, // sid int(11)
  pid: { type: Number }, // pid int(11)
  revision: { type: Number }, // revision int(11)
  qty: { type: Number }, // qty float
  rate: { type: Number }, // rate float
  total: { type: Number }, // total float
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
  freeqty: { type: Number }, // freeqty float
  cgstper: { type: Number }, // cgstper float
  sgstper: { type: Number }, // sgstper float
  igstper: { type: Number }, // igstper float
  cgst: { type: Number }, // cgst float
  sgst: { type: Number }, // sgst float
  igst: { type: Number }, // igst float
  netamount: { type: Number }, // netamount float
  taxamount: { type: String }, // taxamount varchar(255)
  proposalform: { type: String }, // proposalform varchar(255)
  declarationform: { type: String }, // declarationform varchar(255)
  orderform: { type: String }, // orderform varchar(255)
  location: { type: Number }, // location int(11)
  batchno: { type: String }, // batchno varchar(255)
  expirydate: { type: Date }, // expirydate date
  gstper: { type: Number }, // gstper decimal(2
  srno: { type: String }, // srno varchar(50)
  hsncode: { type: String }, // hsncode varchar(25)
}, { timestamps: false })

export default mongoose.model('Salesorderitem', SalesorderitemSchema, 'salesorderitem')
