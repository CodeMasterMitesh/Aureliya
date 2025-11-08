import mongoose from 'mongoose'
const { Schema } = mongoose

const DissolutioninstrumentSchema = new Schema({
  id: { type: Number }, // id int(11)
  dissolutionid: { type: Number }, // dissolutionid int(11)
  instrumentid: { type: Number }, // instrumentid int(11)
  instrumentcode: { type: String }, // instrumentcode varchar(11)
  duedate: { type: Date }, // duedate date
}, { timestamps: false })

export default mongoose.model('Dissolutioninstrument', DissolutioninstrumentSchema, 'dissolutioninstrument')
