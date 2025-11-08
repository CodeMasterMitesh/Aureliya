import mongoose from 'mongoose'
const { Schema } = mongoose

const TestresultinstrumentSchema = new Schema({
  id: { type: Number }, // id int(11)
  testresultid: { type: Number }, // testresultid int(11)
  instrumentid: { type: Number }, // instrumentid int(11)
  instrumentcode: { type: String }, // instrumentcode varchar(11)
  duedate: { type: Date }, // duedate date
}, { timestamps: false })

export default mongoose.model('Testresultinstrument', TestresultinstrumentSchema, 'testresultinstrument')
