import mongoose from 'mongoose'
const { Schema } = mongoose

const PreparationinstrumentSchema = new Schema({
  id: { type: Number }, // id int(11)
  preparationid: { type: Number }, // preparationid int(11)
  instrumentid: { type: Number }, // instrumentid int(11)
  instrumentcode: { type: String }, // instrumentcode varchar(11)
  duedate: { type: Date }, // duedate date
}, { timestamps: false })

export default mongoose.model('Preparationinstrument', PreparationinstrumentSchema, 'preparationinstrument')
