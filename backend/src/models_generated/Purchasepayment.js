import mongoose from 'mongoose'
const { Schema } = mongoose

const PurchasepaymentSchema = new Schema({
  id: { type: Number }, // id int(11)
  purchaseid: { type: Number }, // purchaseid int(11)
  paymenttype: { type: String }, // paymenttype varchar(11)
  chequeno: { type: String }, // chequeno varchar(25)
  amount: { type: String }, // amount varchar(25)
  bankname: { type: String }, // bankname varchar(25)
  branchname: { type: String }, // branchname varchar(25)
  bankacid: { type: Number }, // bankacid int(11)
}, { timestamps: false })

export default mongoose.model('Purchasepayment', PurchasepaymentSchema, 'purchasepayment')
