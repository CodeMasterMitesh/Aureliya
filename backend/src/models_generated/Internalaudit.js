import mongoose from 'mongoose'
const { Schema } = mongoose

const InternalauditSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  grnid: { type: Number }, // grnid int(11)
  grnitem: { type: Number }, // grnitem int(11)
  qcno: { type: String }, // qcno varchar(255)
  qcdate: { type: Date }, // qcdate date
  receiptdate: { type: Date }, // receiptdate date
  invoice: { type: String }, // invoice varchar(255)
  date: { type: Date }, // date date
  supplier: { type: Number }, // supplier int(11)
  inspection: { type: String }, // inspection varchar(255)
  lot: { type: String }, // lot varchar(255)
  expdate: { type: Date }, // expdate date
  desc: { type: String }, // desc varchar(255)
  damage: { type: String }, // damage varchar(255)
  doneby: { type: String }, // doneby varchar(255)
  store: { type: String }, // store varchar(255)
  donebydate: { type: Date }, // donebydate date
  storedate: { type: Date }, // storedate date
  totalcon: { type: String }, // totalcon varchar(255)
  crosscheck: { type: String }, // crosscheck varchar(255)
  qcid: { type: Number }, // qcid int(11)
}, { timestamps: false })

export default mongoose.model('Internalaudit', InternalauditSchema, 'internalaudit')
