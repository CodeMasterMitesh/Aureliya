import mongoose from 'mongoose'
const { Schema } = mongoose

const ChromatographyconditioninstrumentSchema = new Schema({
  id: { type: Number }, // id int(11)
  chromatographyconditionid: { type: Number }, // chromatographyconditionid int(11)
  instrumentid: { type: Number }, // instrumentid int(11)
  instrumentcode: { type: String }, // instrumentcode varchar(11)
  duedate: { type: Date }, // duedate date
  donedate: { type: Date }, // donedate date
  takenweight: { type: String }, // takenweight varchar(50)
}, { timestamps: false })

export default mongoose.model('Chromatographyconditioninstrument', ChromatographyconditioninstrumentSchema, 'chromatographyconditioninstrument')
