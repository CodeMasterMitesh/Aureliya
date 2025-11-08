import mongoose from 'mongoose'
const { Schema } = mongoose

const NewqcitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  qcid: { type: Number }, // qcid int(11)
  pid: { type: Number }, // pid int(11)
  srno: { type: Number }, // srno int(11)
  code: { type: String }, // code varchar(255)
  batchno: { type: String }, // batchno varchar(255)
  mfgdate: { type: Date }, // mfgdate date
  expdate: { type: Date }, // expdate date
  qty: { type: Number }, // qty decimal(15
  rejectqty: { type: Number }, // rejectqty decimal(15
  sampleqty: { type: Number }, // sampleqty decimal(15
  stockqty: { type: Number }, // stockqty decimal(15
  remarks: { type: String }, // remarks varchar(255)
  arno: { type: String }, // arno varchar(255)
  status: { type: String }, // status varchar(255)
  dimensions: { type: String }, // dimensions varchar(255)
  materialused: { type: String }, // materialused varchar(255)
  revision: { type: Number }, // revision int(11)
}, { timestamps: false })

export default mongoose.model('Newqcitems', NewqcitemsSchema, 'newqcitems')
