import mongoose from 'mongoose'
const { Schema } = mongoose

const ChequeregisterSchema = new Schema({
  id: { type: Number }, // id int(11)
  bankname: { type: String }, // bankname varchar(255)
  rangeofcheque: { type: String }, // rangeofcheque varchar(255)
  numberofcheque: { type: String }, // numberofcheque varchar(255)
  issuedcheque: { type: String }, // issuedcheque varchar(255)
  clearedcheque: { type: String }, // clearedcheque varchar(255)
  issuablecheque: { type: String }, // issuablecheque varchar(255)
  reconcile: { type: String }, // reconcile varchar(255)
  detail: { type: String }, // detail varchar(255)
}, { timestamps: false })

export default mongoose.model('Chequeregister', ChequeregisterSchema, 'chequeregister')
