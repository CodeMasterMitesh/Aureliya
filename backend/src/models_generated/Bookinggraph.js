import mongoose from 'mongoose'
const { Schema } = mongoose

const BookinggraphSchema = new Schema({
  id: { type: Number }, // id int(11)
  bookingid: { type: Number }, // bookingid int(11)
  name: { type: String }, // name varchar(255)
  graph: { type: String }, // graph text
}, { timestamps: false })

export default mongoose.model('Bookinggraph', BookinggraphSchema, 'bookinggraph')
