import mongoose from 'mongoose'
const { Schema } = mongoose

const VendorevaluationSchema = new Schema({
  supplier: { type: String }, // supplier varchar(100)
  ratingno: { type: String }, // ratingno varchar(100)
  date: { type: Date }, // date date
  month: { type: Number }, // month int(11)
  year: { type: Number }, // year int(11)
  quality: { type: String }, // quality varchar(100)
  percentage: { type: String }, // percentage varchar(100)
  nonconformaing: { type: String }, // nonconformaing varchar(100)
  response: { type: String }, // response varchar(100)
  delivery: { type: String }, // delivery varchar(100)
  ability: { type: String }, // ability varchar(100)
  communication: { type: String }, // communication varchar(100)
  behavior: { type: String }, // behavior varchar(100)
  approach: { type: String }, // approach varchar(100)
  performance: { type: String }, // performance varchar(100)
  remark: { type: String }, // remark varchar(100)
  action: { type: String }, // action varchar(100)
  datetime: { type: Date }, // datetime date
  enterby: { type: String }, // enterby varchar(100)
  modifiedby: { type: String }, // modifiedby varchar(100)
  modifieddatetime: { type: Date }, // modifieddatetime date
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  id: { type: Number }, // id int(11)
}, { timestamps: false })

export default mongoose.model('Vendorevaluation', VendorevaluationSchema, 'vendorevaluation')
