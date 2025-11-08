import mongoose from 'mongoose'
const { Schema } = mongoose

const SoftwaresSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  desc: { type: String }, // desc text
  installed: { type: Number }, // installed int(11)
  code: { type: String }, // code varchar(50)
  sort: { type: Number }, // sort int(11)
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Softwares', SoftwaresSchema, 'softwares')
