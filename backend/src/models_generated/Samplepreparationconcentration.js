import mongoose from 'mongoose'
const { Schema } = mongoose

const SamplepreparationconcentrationSchema = new Schema({
  id: { type: Number }, // id int(11)
  diluent: { type: String }, // diluent varchar(50)
  samplepreparationid: { type: Number }, // samplepreparationid int(11)
  taken: { type: Number }, // taken float
  dilution: { type: Number }, // dilution float
  concentration: { type: Number }, // concentration float
}, { timestamps: false })

export default mongoose.model('Samplepreparationconcentration', SamplepreparationconcentrationSchema, 'samplepreparationconcentration')
