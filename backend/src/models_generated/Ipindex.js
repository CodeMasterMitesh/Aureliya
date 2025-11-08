import mongoose from 'mongoose'
const { Schema } = mongoose

const IpindexSchema = new Schema({
  name: { type: String }, // name varchar(86)
  code: { type: Number }, // code int(11)
  company: { type: Number }, // company int(11)
  id: { type: Number }, // id int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  pharmacopoeiaid: { type: Number }, // pharmacopoeiaid int(11)
}, { timestamps: false })

export default mongoose.model('Ipindex', IpindexSchema, 'ipindex')
