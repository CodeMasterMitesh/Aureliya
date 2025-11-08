import mongoose from 'mongoose'
const { Schema } = mongoose

const BookingconsumptionSchema = new Schema({
  id: { type: Number }, // id int(11)
  testid: { type: Number }, // testid int(11)
  mid: { type: Number }, // mid int(11)
  salsrno: { type: String }, // salsrno varchar(100)
  qty: { type: Number }, // qty float
  units: { type: String }, // units varchar(50)
  avlqty: { type: Number }, // avlqty decimal(15
  branch: { type: Number }, // branch int(11)
  godown: { type: Number }, // godown int(11)
}, { timestamps: false })

export default mongoose.model('Bookingconsumption', BookingconsumptionSchema, 'bookingconsumption')
