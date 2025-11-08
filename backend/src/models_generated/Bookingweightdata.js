import mongoose from 'mongoose'
const { Schema } = mongoose

const BookingweightdataSchema = new Schema({
  id: { type: Number }, // id int(11)
  bookingid: { type: Number }, // bookingid int(11)
  testid: { type: Number }, // testid int(11)
  materialname: { type: String }, // materialname varchar(255)
  grossweight: { type: Number }, // grossweight float
  netweight: { type: Number }, // netweight float
  tareweight: { type: Number }, // tareweight float
  data: { type: String }, // data text
  datetime: { type: Date }, // datetime datetime
  enterby: { type: Number }, // enterby int(11)
  backweight: { type: String }, // backweight varchar(50)
}, { timestamps: false })

export default mongoose.model('Bookingweightdata', BookingweightdataSchema, 'bookingweightdata')
