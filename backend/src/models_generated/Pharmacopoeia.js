import mongoose from 'mongoose'
const { Schema } = mongoose

const PharmacopoeiaSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  volno: { type: String }, // volno varchar(25)
  year: { type: String }, // year varchar(25)
  edition: { type: String }, // edition varchar(25)
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Pharmacopoeia', PharmacopoeiaSchema, 'pharmacopoeia')
