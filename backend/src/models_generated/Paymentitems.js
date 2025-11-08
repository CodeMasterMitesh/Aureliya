import mongoose from 'mongoose'
const { Schema } = mongoose

const PaymentitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  paymentid: { type: Number }, // paymentid int(11)
  amount: { type: Number }, // amount double
  purchaseid: { type: Number }, // purchaseid int(11)
  dueamount: { type: Number }, // dueamount double
  remaining: { type: Number }, // remaining double
  vouchertype: { type: String }, // vouchertype varchar(15)
  billtype: { type: String }, // billtype varchar(100)
  name: { type: String }, // name varchar(100)
  typeField: { type: String }, // type varchar(25)
  invoiceno: { type: String }, // invoiceno varchar(150)
  billdate: { type: Date }, // billdate date
  salesid: { type: Number }, // salesid int(11)
}, { timestamps: false })

export default mongoose.model('Paymentitems', PaymentitemsSchema, 'paymentitems')
