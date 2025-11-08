import mongoose from 'mongoose'
const { Schema } = mongoose

const ModulesCopySchema = new Schema({
  id: { type: Number }, // id int(11)
  sid: { type: Number }, // sid int(11)
  name: { type: String }, // name varchar(255)
  installed: { type: Number }, // installed int(11)
  parent: { type: Number }, // parent int(11)
  sort: { type: Number }, // sort int(11)
  code: { type: String }, // code varchar(50)
  grnno: { type: Number }, // grnno int(50)
}, { timestamps: false })

export default mongoose.model('ModulesCopy', ModulesCopySchema, 'modules_copy')
