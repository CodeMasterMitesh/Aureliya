import mongoose from 'mongoose'
const { Schema } = mongoose

const QcitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  qcid: { type: Number }, // qcid int(11)
  qty: { type: Number }, // qty float
  container: { type: String }, // container varchar(255)
  expdate: { type: String }, // expdate varchar(50)
  mfgdate: { type: String }, // mfgdate varchar(50)
  pid: { type: Number }, // pid int(11)
  batchno: { type: String }, // batchno varchar(50)
  rejectqty: { type: Number }, // rejectqty int(11)
  grno: { type: Number }, // grno int(11)
}, { timestamps: false })

export default mongoose.model('Qcitems', QcitemsSchema, 'qcitems')
