import mongoose from 'mongoose'
const { Schema } = mongoose

const SamplepreparationchemicalsSchema = new Schema({
  id: { type: Number }, // id int(11)
  samplepreparationid: { type: Number }, // samplepreparationid int(11)
  chemicalid: { type: Number }, // chemicalid int(11)
  batchno: { type: String }, // batchno varchar(100)
  usebeforedate: { type: Date }, // usebeforedate date
  qty: { type: Number }, // qty float
}, { timestamps: false })

export default mongoose.model('Samplepreparationchemicals', SamplepreparationchemicalsSchema, 'samplepreparationchemicals')
