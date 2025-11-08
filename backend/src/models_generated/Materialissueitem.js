import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialissueitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  qty: { type: Number }, // qty double
  materialissueid: { type: Number }, // materialissueid int(11)
  pid: { type: Number }, // pid int(11)
  revision: { type: Number }, // revision int(11)
  barcode: { type: String }, // barcode varchar(255)
  availqty: { type: Number }, // availqty float
  reqqty: { type: Number }, // reqqty float
  binno: { type: String }, // binno varchar(100)
  unit: { type: Number }, // unit int(11)
  batchno: { type: String }, // batchno text
  rate: { type: Number }, // rate float
  amount: { type: Number }, // amount float
  cgstper: { type: Number }, // cgstper float
  cgstamt: { type: Number }, // cgstamt float
  sgstper: { type: Number }, // sgstper float
  sgstamt: { type: Number }, // sgstamt float
  igstper: { type: Number }, // igstper float
  igstamt: { type: Number }, // igstamt float
  netamount: { type: Number }, // netamount float
  fromgodown: { type: Number }, // fromgodown int(11)
  code: { type: String }, // code varchar(255)
  mfgdte: { type: String }, // mfgdte text
  expdte: { type: String }, // expdte text
  batchqty: { type: String }, // batchqty text
  srno: { type: String }, // srno varchar(255)
  printrate: { type: Number }, // printrate decimal(15
  printamount: { type: Number }, // printamount decimal(15
}, { timestamps: false })

export default mongoose.model('Materialissueitem', MaterialissueitemSchema, 'materialissueitem')
