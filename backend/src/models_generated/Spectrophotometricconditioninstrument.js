import mongoose from 'mongoose'
const { Schema } = mongoose

const SpectrophotometricconditioninstrumentSchema = new Schema({
  id: { type: Number }, // id int(11)
  spectrophotometricconditionid: { type: Number }, // spectrophotometricconditionid int(11)
  instrumentid: { type: Number }, // instrumentid int(11)
  instrumentcode: { type: String }, // instrumentcode varchar(11)
  duedate: { type: Date }, // duedate datetime
  donedate: { type: Date }, // donedate datetime
  blankobserved: { type: String }, // blankobserved varchar(50)
  standardobserved: { type: String }, // standardobserved varchar(50)
  sampleobserved: { type: String }, // sampleobserved varchar(50)
  generalobserved: { type: String }, // generalobserved varchar(50)
}, { timestamps: false })

export default mongoose.model('Spectrophotometricconditioninstrument', SpectrophotometricconditioninstrumentSchema, 'spectrophotometricconditioninstrument')
