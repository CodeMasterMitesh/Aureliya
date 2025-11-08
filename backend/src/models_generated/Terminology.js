import mongoose from 'mongoose'
const { Schema } = mongoose

const TerminologySchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  txt: { type: String }, // txt text
  img: { type: String }, // img varchar(255)
}, { timestamps: false })

export default mongoose.model('Terminology', TerminologySchema, 'terminology')
