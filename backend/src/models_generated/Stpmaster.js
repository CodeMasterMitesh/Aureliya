import mongoose from 'mongoose'
const { Schema } = mongoose

const StpmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  pharmacopoeia: { type: Number }, // pharmacopoeia int(11)
  nonnable: { type: String }, // nonnable varchar(25)
  remarks: { type: String }, // remarks text
  formula: { type: Number }, // formula int(11)
}, { timestamps: false })

export default mongoose.model('Stpmaster', StpmasterSchema, 'stpmaster')
