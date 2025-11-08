import mongoose from 'mongoose'
const { Schema } = mongoose

const SalesbillitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  salesbillid: { type: Number }, // salesbillid int(11)
  pid: { type: Number }, // pid int(11)
  revision: { type: Number }, // revision int(11)
  availableqty: { type: Number }, // availableqty float
  qty: { type: Number }, // qty float
  freeqty: { type: Number }, // freeqty int(11)
  rqty: { type: Number }, // rqty float
  rate: { type: Number }, // rate double
  amount: { type: Number }, // amount double
  cgstper: { type: Number }, // cgstper float
  cgst: { type: Number }, // cgst float
  sgstper: { type: Number }, // sgstper float
  sgst: { type: Number }, // sgst float
  igstper: { type: Number }, // igstper float
  igst: { type: Number }, // igst float
  netamount: { type: Number }, // netamount decimal(15
  taxamount: { type: Number }, // taxamount decimal(15
  ledgerid: { type: Number }, // ledgerid int(11)
  batchno: { type: String }, // batchno text
  description: { type: String }, // description varchar(255)
  location: { type: Number }, // location int(11)
  expirydate: { type: Date }, // expirydate date
  gstper: { type: Number }, // gstper float
  batchqty: { type: String }, // batchqty text
  batchfreeqty: { type: String }, // batchfreeqty text
  expdte: { type: String }, // expdte text
  mfgdte: { type: String }, // mfgdte text
  srno: { type: String }, // srno varchar(255)
  issueid: { type: Number }, // issueid int(11)
  isservc: { type: String }, // isservc varchar(50)
  pretaxval: { type: String }, // pretaxval varchar(50)
  cess: { type: Number }, // cess decimal(15
  cessper: { type: Number }, // cessper float
  othercharges: { type: Number }, // othercharges decimal(15
  orgcntry: { type: String }, // orgcntry varchar(20)
  prdsino: { type: String }, // prdsino varchar(25)
  hsncode: { type: String }, // hsncode varchar(25)
  disc: { type: Number }, // disc float
  typedisc: { type: String }, // typedisc varchar(10)
}, { timestamps: false })

export default mongoose.model('Salesbillitem', SalesbillitemSchema, 'salesbillitem')
