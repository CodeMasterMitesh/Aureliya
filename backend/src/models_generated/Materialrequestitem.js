import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialrequestitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  materialrequestid: { type: Number }, // materialrequestid int(11)
  pid: { type: Number }, // pid int(11)
  barcode: { type: String }, // barcode varchar(255)
  qty: { type: Number }, // qty float
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  action: { type: String }, // action varchar(25)
  unit: { type: Number }, // unit int(11)
  code: { type: String }, // code varchar(50)
  make: { type: String }, // make varchar(255)
  srno: { type: String }, // srno varchar(255)
  revision: { type: Number }, // revision int(11)
}, { timestamps: false })

export default mongoose.model('Materialrequestitem', MaterialrequestitemSchema, 'materialrequestitem')
