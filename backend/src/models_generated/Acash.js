import mongoose from 'mongoose'
const { Schema } = mongoose

const AcashSchema = new Schema({
  id: { type: Number }, // id int(11)
  code: { type: Number }, // CODE int(11)
  ccode: { type: Number }, // CCODE int(11)
  drCr: { type: String }, // DR_CR varchar(1)
  vno: { type: Number }, // VNO int(11)
  qty: { type: String }, // QTY varchar(7)
  amount: { type: String }, // AMOUNT varchar(13)
  date: { type: String }, // DATE varchar(10)
  narration: { type: String }, // NARRATION varchar(10)
  narr: { type: String }, // NARR varchar(10)
  recno: { type: Number }, // RECNO int(11)
  appliedamt: { type: String }, // APPLIEDAMT varchar(7)
  bno: { type: String }, // BNO varchar(3)
  flint: { type: String }, // FLINT varchar(10)
  nar: { type: String }, // NAR varchar(40)
  csid: { type: String }, // CSID varchar(10)
  jcode: { type: Number }, // JCODE int(11)
  username: { type: String }, // USERNAME varchar(10)
}, { timestamps: false })

export default mongoose.model('Acash', AcashSchema, 'acash')
