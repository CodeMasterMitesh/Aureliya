import mongoose from 'mongoose'
const { Schema } = mongoose

const StocktransferitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  stocktransferid: { type: Number }, // stocktransferid int(11)
  pid: { type: Number }, // pid int(11)
  sentqty: { type: String }, // sentqty varchar(11)
  receivedqty: { type: String }, // receivedqty varchar(11)
  itemcode: { type: String }, // itemcode varchar(50)
  batchno: { type: String }, // batchno varchar(50)
  batchqty: { type: String }, // batchqty varchar(50)
  revision: { type: String }, // revision varchar(50)
  qty: { type: String }, // qty varchar(50)
  rate: { type: String }, // rate varchar(50)
  amount: { type: String }, // amount varchar(50)
}, { timestamps: false })

export default mongoose.model('Stocktransferitems', StocktransferitemsSchema, 'stocktransferitems')
