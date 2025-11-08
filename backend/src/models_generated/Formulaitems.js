import mongoose from 'mongoose'
const { Schema } = mongoose

const FormulaitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  fmid: { type: String }, // fmid varchar(255)
  name: { type: String }, // name varchar(255)
  alfa: { type: String }, // alfa varchar(25)
  formula: { type: String }, // formula varchar(255)
  typeField: { type: String }, // type varchar(25)
  unit: { type: String }, // unit varchar(25)
  value: { type: String }, // value varchar(255)
  sort: { type: Number }, // sort int(11)
  bypass: { type: String }, // bypass varchar(20)
}, { timestamps: false })

export default mongoose.model('Formulaitems', FormulaitemsSchema, 'formulaitems')
