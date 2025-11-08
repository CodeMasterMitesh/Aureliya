import mongoose from 'mongoose'
const { Schema } = mongoose

const TestresultchemicalsSchema = new Schema({
  id: { type: Number }, // id int(11)
  testresultid: { type: Number }, // testresultid int(11)
  chemicalid: { type: Number }, // chemicalid int(11)
  batchno: { type: String }, // batchno varchar(100)
  usebeforedate: { type: Date }, // usebeforedate date
  qty: { type: Number }, // qty float
}, { timestamps: false })

export default mongoose.model('Testresultchemicals', TestresultchemicalsSchema, 'testresultchemicals')
