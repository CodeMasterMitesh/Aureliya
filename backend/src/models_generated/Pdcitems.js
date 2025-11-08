import mongoose from 'mongoose'
const { Schema } = mongoose

const PdcitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  salesbillid: { type: Number }, // salesbillid int(11)
  duedays: { type: Number }, // duedays float
  duedate: { type: Date }, // duedate date
  amount: { type: Number }, // amount float
}, { timestamps: false })

export default mongoose.model('Pdcitems', PdcitemsSchema, 'pdcitems')
