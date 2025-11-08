import mongoose from 'mongoose'
const { Schema } = mongoose

const ModulesSchema = new Schema({
  id: { type: Number }, // id int(11)
  sid: { type: Number }, // sid int(11)
  name: { type: String }, // name varchar(255)
  installed: { type: Number }, // installed int(11)
  parent: { type: Number }, // parent int(11)
  sort: { type: Number }, // sort int(11)
  code: { type: String }, // code varchar(255)
  grnno: { type: Number }, // grnno int(50)
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Modules', ModulesSchema, 'modules')
