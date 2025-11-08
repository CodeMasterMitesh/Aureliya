import mongoose from 'mongoose'
const { Schema } = mongoose

const TeststartSchema = new Schema({
  id: { type: Number }, // id int(11)
  company: { type: Number }, // company int(11)
  bookingid: { type: Number }, // bookingid int(11)
  startdate: { type: Date }, // startdate datetime
  enddate: { type: Date }, // enddate datetime
  testid: { type: Number }, // testid int(11)
  typeField: { type: String }, // type varchar(20)
}, { timestamps: false })

export default mongoose.model('Teststart', TeststartSchema, 'teststart')
