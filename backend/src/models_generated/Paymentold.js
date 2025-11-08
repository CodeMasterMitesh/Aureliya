import mongoose from 'mongoose'
const { Schema } = mongoose

const PaymentoldSchema = new Schema({
  id: { type: Number }, // id int(11)
  voucherNo: { type: String }, // voucher_no varchar(100)
  date: { type: Date }, // date date
  desc: { type: String }, // desc varchar(255)
  paymenttype: { type: String }, // paymenttype varchar(255)
  bankname: { type: String }, // bankname varchar(255)
  branchname: { type: String }, // branchname varchar(255)
  chequeno: { type: String }, // chequeno varchar(255)
  chequedate: { type: Date }, // chequedate date
  amount: { type: String }, // amount varchar(255)
}, { timestamps: false })

export default mongoose.model('Paymentold', PaymentoldSchema, 'paymentold')
