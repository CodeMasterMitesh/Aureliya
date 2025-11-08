import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialreturnitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  materialreturnid: { type: Number }, // materialreturnid int(11)
  pid: { type: Number }, // pid int(11)
  revision: { type: Number }, // revision int(11)
  batchno: { type: String }, // batchno text
  barcode: { type: String }, // barcode varchar(255)
  qty: { type: Number }, // qty decimal(10
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
  rate: { type: Number }, // rate decimal(10
  amount: { type: Number }, // amount decimal(10
  purpose: { type: String }, // purpose varchar(20)
  godown: { type: Number }, // godown int(11)
  srno: { type: String }, // srno varchar(255)
  mfgdte: { type: Date }, // mfgdte date
  expdte: { type: Date }, // expdte date
  batchqty: { type: String }, // batchqty text
  mibatchno: { type: String }, // mibatchno text
  mibatchqty: { type: String }, // mibatchqty text
}, { timestamps: false })

export default mongoose.model('Materialreturnitem', MaterialreturnitemSchema, 'materialreturnitem')
