import mongoose from 'mongoose'
const { Schema } = mongoose

const ReasonmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Reasonmaster', ReasonmasterSchema, 'reasonmaster')
