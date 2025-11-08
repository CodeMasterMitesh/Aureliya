import mongoose from 'mongoose'
const { Schema } = mongoose

const PrintversionroaSchema = new Schema({
  id: { type: Number }, // id int(11)
  bookingid: { type: Number }, // bookingid int(11)
  printby: { type: Number }, // printby int(11)
  printdatetime: { type: Date }, // printdatetime datetime
  versionno: { type: Number }, // versionno int(11)
}, { timestamps: false })

export default mongoose.model('Printversionroa', PrintversionroaSchema, 'printversionroa')
