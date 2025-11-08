import mongoose from 'mongoose'
const { Schema } = mongoose

const DissolutionmediumpreparationinstrumentSchema = new Schema({
  id: { type: Number }, // id int(11)
  dissolutionmediumpreparationid: { type: Number }, // dissolutionmediumpreparationid int(11)
  instrumentid: { type: Number }, // instrumentid int(11)
  instrumentcode: { type: String }, // instrumentcode varchar(11)
  duedate: { type: Date }, // duedate datetime
  donedate: { type: Date }, // donedate datetime
  takenweight: { type: Number }, // takenweight float
}, { timestamps: false })

export default mongoose.model('Dissolutionmediumpreparationinstrument', DissolutionmediumpreparationinstrumentSchema, 'dissolutionmediumpreparationinstrument')
