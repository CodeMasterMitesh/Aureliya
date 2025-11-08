import mongoose from 'mongoose'
const { Schema } = mongoose

const ChromatographygradientSchema = new Schema({
  id: { type: Number }, // id int(11)
  chromatographyconditionid: { type: Number }, // chromatographyconditionid int(11)
  timea: { type: String }, // timeA varchar(50)
  mobilephasea: { type: String }, // mobilephaseA varchar(100)
  mobilephaseb: { type: String }, // mobilephaseB varchar(100)
  mobilephasec: { type: String }, // mobilephaseC varchar(100)
  flowrate: { type: String }, // flowrate varchar(50)
}, { timestamps: false })

export default mongoose.model('Chromatographygradient', ChromatographygradientSchema, 'chromatographygradient')
