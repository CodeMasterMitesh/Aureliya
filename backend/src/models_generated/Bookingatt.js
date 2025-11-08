import mongoose from 'mongoose'
const { Schema } = mongoose

const BookingattSchema = new Schema({
  id: { type: Number }, // id int(11)
  bookingid: { type: Number }, // bookingid int(11)
  filename: { type: String }, // filename varchar(255)
  document: { type: String }, // document varchar(255)
}, { timestamps: false })

export default mongoose.model('Bookingatt', BookingattSchema, 'bookingatt')
