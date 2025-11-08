import mongoose from 'mongoose'
const { Schema } = mongoose

const StockjournalproductSchema = new Schema({
  id: { type: Number }, // id int(11)
  stockjournalid: { type: Number }, // stockjournalid int(11)
  pid: { type: Number }, // pid int(11)
  partno: { type: String }, // partno varchar(100)
  qty: { type: Number }, // qty decimal(20
  rate: { type: Number }, // rate float
  amount: { type: Number }, // amount float
  batchno: { type: String }, // batchno varchar(100)
  mfgdte: { type: String }, // mfgdte text
  expdte: { type: String }, // expdte text
  location: { type: Number }, // location int(11)
  unit: { type: Number }, // unit int(11)
  adminrate: { type: Number }, // adminrate int(11)
}, { timestamps: false })

export default mongoose.model('Stockjournalproduct', StockjournalproductSchema, 'stockjournalproduct')
