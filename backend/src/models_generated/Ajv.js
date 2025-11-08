import mongoose from 'mongoose'
const { Schema } = mongoose

const AjvSchema = new Schema({
  id: { type: Number }, // id int(11)
  vno: { type: Number }, // VNO int(11)
  edate: { type: String }, // EDATE varchar(10)
  date: { type: String }, // DATE varchar(10)
  code: { type: Number }, // CODE int(11)
  refCode: { type: Number }, // REF_CODE int(11)
  amount: { type: String }, // AMOUNT varchar(14)
  drcr: { type: String }, // DRCR varchar(1)
  narr: { type: String }, // NARR varchar(26)
  cnarr: { type: String }, // CNARR varchar(40)
  appliedamt: { type: String }, // APPLIEDAMT varchar(7)
  bno: { type: String }, // BNO varchar(10)
  bdate: { type: String }, // BDATE varchar(10)
  cnarr1: { type: String }, // CNARR1 varchar(40)
  flint: { type: String }, // FLINT varchar(10)
  recno: { type: Number }, // RECNO int(11)
  jcode: { type: Number }, // JCODE int(11)
  typeField: { type: String }, // TYPE varchar(10)
  sbno: { type: String }, // SBNO varchar(10)
}, { timestamps: false })

export default mongoose.model('Ajv', AjvSchema, 'ajv')
