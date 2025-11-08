import mongoose from 'mongoose'
const { Schema } = mongoose

const SalesreturnitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  srid: { type: Number }, // srid int(11)
  pid: { type: Number }, // pid int(11)
  revision: { type: Number }, // revision int(11)
  mid: { type: Number }, // mid int(11)
  qty: { type: Number }, // qty decimal(10
  weight: { type: Number }, // weight decimal(10
  rate: { type: Number }, // rate decimal(10
  amount: { type: Number }, // amount decimal(10
  salesnumber: { type: String }, // salesnumber varchar(100)
  rqty: { type: Number }, // rqty decimal(10
  srno: { type: String }, // srno varchar(255)
  qty2: { type: Number }, // qty2 decimal(10
  cgstper: { type: Number }, // cgstper decimal(10
  cgst: { type: Number }, // cgst decimal(10
  sgstper: { type: Number }, // sgstper decimal(10
  sgst: { type: Number }, // sgst decimal(10
  igstper: { type: Number }, // igstper decimal(10
  igst: { type: Number }, // igst decimal(10
  netamount: { type: Number }, // netamount decimal(10
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
  ledgerid: { type: Number }, // ledgerid int(11)
  batchno: { type: String }, // batchno varchar(255)
  godown: { type: Number }, // godown int(11)
  discount: { type: Number }, // discount decimal(10
  location: { type: String }, // location varchar(20)
  taxamount: { type: Number }, // taxamount decimal(10
  gstper: { type: Number }, // gstper int(11)
  description: { type: String }, // description varchar(255)
  hsncode: { type: String }, // hsncode varchar(50)
  freeqty: { type: Number }, // freeqty decimal(15
  refreeqty: { type: Number }, // refreeqty decimal(15
  batchqty: { type: String }, // batchqty text
  batchfreeqty: { type: String }, // batchfreeqty text
  sbbatchqty: { type: String }, // sbbatchqty text
  sbbatchfreeqty: { type: String }, // sbbatchfreeqty text
  sbbatchno: { type: String }, // sbbatchno text
}, { timestamps: false })

export default mongoose.model('Salesreturnitems', SalesreturnitemsSchema, 'salesreturnitems')
