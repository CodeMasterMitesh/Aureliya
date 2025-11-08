import mongoose from 'mongoose'
const { Schema } = mongoose

const SalsorderpdcitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  salesorderid: { type: Number }, // salesorderid int(11)
  duedays: { type: Number }, // duedays float
  duedate: { type: Date }, // duedate date
  amount: { type: Number }, // amount float
}, { timestamps: false })

export default mongoose.model('Salsorderpdcitems', SalsorderpdcitemsSchema, 'salsorderpdcitems')
