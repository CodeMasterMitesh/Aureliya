import mongoose from 'mongoose'
const { Schema } = mongoose

const EndofthedaysSchema = new Schema({
  id: { type: Number }, // id int(11)
  prioritydate: { type: Date }, // prioritydate date
  company: { type: Number }, // company int(11)
  cid: { type: Number }, // cid int(11)
  userid: { type: Number }, // userid int(11)
  testname: { type: String }, // testname varchar(100)
  bookingid: { type: Number }, // bookingid int(11)
  bookingno: { type: Number }, // bookingno int(11)
  reason: { type: String }, // reason varchar(255)
}, { timestamps: false })

export default mongoose.model('Endofthedays', EndofthedaysSchema, 'endofthedays')
