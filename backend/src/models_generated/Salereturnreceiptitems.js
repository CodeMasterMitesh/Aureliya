import mongoose from 'mongoose'
const { Schema } = mongoose

const SalereturnreceiptitemsSchema = new Schema({
  id: { type: Number }, // id int(10)
  srid: { type: Number }, // srid int(10)
  salesid: { type: Number }, // salesid int(10)
  amount: { type: Number }, // amount decimal(15
  dueamount: { type: Number }, // dueamount decimal(15
  remaining: { type: Number }, // remaining decimal(15
  typeField: { type: String }, // type varchar(20)
  vouchertype: { type: String }, // vouchertype varchar(15)
  name: { type: String }, // name varchar(200)
  billtype: { type: String }, // billtype varchar(100)
  kasar: { type: Number }, // kasar float
}, { timestamps: false })

export default mongoose.model('Salereturnreceiptitems', SalereturnreceiptitemsSchema, 'salereturnreceiptitems')
