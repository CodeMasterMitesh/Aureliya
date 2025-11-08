import mongoose from 'mongoose'
const { Schema } = mongoose

const MinSchema = new Schema({
  id: { type: Number }, // id int(11)
  minno: { type: String }, // minno varchar(255)
  employee: { type: String }, // employee varchar(255)
  datetime: { type: Date }, // datetime datetime
  refworkorderno: { type: Number }, // refworkorderno int(11)
  resource: { type: Number }, // resource int(11)
}, { timestamps: false })

export default mongoose.model('Min', MinSchema, 'min')
