import mongoose from 'mongoose'
const { Schema } = mongoose

const SalespaymentSchema = new Schema({
  id: { type: Number }, // id int(11)
  saleid: { type: Number }, // saleid int(11)
  paymenttype: { type: String }, // paymenttype varchar(11)
  chequeno: { type: String }, // chequeno varchar(25)
  amount: { type: String }, // amount varchar(25)
  bankname: { type: String }, // bankname varchar(25)
  branchname: { type: String }, // branchname varchar(25)
}, { timestamps: false })

export default mongoose.model('Salespayment', SalespaymentSchema, 'salespayment')
