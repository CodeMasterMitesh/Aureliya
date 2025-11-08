import mongoose from 'mongoose'
const { Schema } = mongoose

const VoucheritemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  voucherid: { type: Number }, // voucherid int(11)
  crdr: { type: String }, // crdr varchar(10)
  accgrid: { type: Number }, // accgrid int(11)
  ledgerid: { type: Number }, // ledgerid int(11)
  amount: { type: String }, // amount varchar(15)
  reconcile: { type: Number }, // reconcile int(11)
  cheque: { type: String }, // cheque varchar(12)
  chequeno: { type: String }, // chequeno varchar(12)
  bankname: { type: String }, // bankname varchar(20)
  branchname: { type: String }, // branchname varchar(20)
  chequedate: { type: Date }, // chequedate date
  costid: { type: Number }, // costid int(11)
  typeField: { type: String }, // type varchar(50)
}, { timestamps: false })

export default mongoose.model('Voucheritems', VoucheritemsSchema, 'voucheritems')
