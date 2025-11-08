import mongoose from 'mongoose'
const { Schema } = mongoose

const ChromatographyrampedSchema = new Schema({
  id: { type: Number }, // id int(11)
  chromatographyconditionid: { type: Number }, // chromatographyconditionid int(11)
  retentiontm: { type: String }, // retentiontm varchar(50)
  retention: { type: String }, // retention varchar(50)
  rate: { type: String }, // rate varchar(50)
  temperature: { type: String }, // temperature varchar(50)
  holdtm: { type: String }, // holdtm varchar(50)
}, { timestamps: false })

export default mongoose.model('Chromatographyramped', ChromatographyrampedSchema, 'chromatographyramped')
