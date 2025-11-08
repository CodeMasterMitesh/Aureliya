import mongoose from 'mongoose'
const { Schema } = mongoose

const SupplierpricelistitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  sid: { type: Number }, // sid int(11)
  pid: { type: Number }, // pid int(11)
  rate: { type: Number }, // rate float
  netamount: { type: String }, // netamount varchar(25)
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
  no: { type: String }, // no varchar(20)
  code: { type: String }, // code varchar(20)
  srno: { type: String }, // srno varchar(255)
  discount: { type: String }, // discount varchar(25)
  amount: { type: String }, // amount varchar(25)
}, { timestamps: false })

export default mongoose.model('Supplierpricelistitem', SupplierpricelistitemSchema, 'supplierpricelistitem')
