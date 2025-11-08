import mongoose from 'mongoose'
const { Schema } = mongoose

const StandardpreparationconcentrationSchema = new Schema({
  id: { type: Number }, // id int(11)
  standardpreparationid: { type: Number }, // standardpreparationid int(11)
  chemicalid: { type: Number }, // chemicalid int(11)
  batchno: { type: String }, // batchno varchar(100)
  usebeforedate: { type: Date }, // usebeforedate date
  taken: { type: Number }, // taken float
  dilution: { type: Number }, // dilution float
  concentration: { type: Number }, // concentration float
  diluent: { type: String }, // diluent varchar(50)
  content: { type: String }, // content varchar(50)
}, { timestamps: false })

export default mongoose.model('Standardpreparationconcentration', StandardpreparationconcentrationSchema, 'standardpreparationconcentration')
