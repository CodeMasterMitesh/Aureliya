import mongoose from 'mongoose'
const { Schema } = mongoose

const Formulamaster1Schema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  typeField: { type: String }, // type varchar(255)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Formulamaster1', Formulamaster1Schema, 'formulamaster1')
