import mongoose from 'mongoose'
const { Schema } = mongoose

const PurchasereturnitempaymentitemsSchema = new Schema({
  id: { type: Number }, // id int(10)
  prid: { type: Number }, // prid int(10)
  purchaseid: { type: Number }, // purchaseid int(10)
  amount: { type: Number }, // amount double
  dueamount: { type: Number }, // dueamount double
  remaining: { type: Number }, // remaining double
  typeField: { type: String }, // type varchar(20)
  vouchertype: { type: String }, // vouchertype varchar(15)
  name: { type: String }, // name varchar(200)
  billtype: { type: String }, // billtype varchar(100)
  kasar: { type: Number }, // kasar float
}, { timestamps: false })

export default mongoose.model('Purchasereturnitempaymentitems', PurchasereturnitempaymentitemsSchema, 'purchasereturnitempaymentitems')
