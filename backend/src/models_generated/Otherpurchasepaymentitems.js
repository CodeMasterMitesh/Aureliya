import mongoose from 'mongoose'
const { Schema } = mongoose

const OtherpurchasepaymentitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  otherpurchaseid: { type: Number }, // otherpurchaseid int(11)
  purchaseid: { type: Number }, // purchaseid int(11)
  amount: { type: Number }, // amount double
  dueamount: { type: Number }, // dueamount double
  remaining: { type: Number }, // remaining double
  typeField: { type: String }, // type varchar(20)
  vouchertype: { type: String }, // vouchertype varchar(15)
  name: { type: String }, // name varchar(200)
  billtype: { type: String }, // billtype varchar(100)
}, { timestamps: false })

export default mongoose.model('Otherpurchasepaymentitems', OtherpurchasepaymentitemsSchema, 'otherpurchasepaymentitems')
