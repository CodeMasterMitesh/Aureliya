import mongoose from 'mongoose'
const { Schema } = mongoose

const UserrightsSchema = new Schema({
  id: { type: Number }, // id int(11)
  eid: { type: Number }, // eid int(11)
  moduleid: { type: Number }, // moduleid int(11)
  add: { type: Number }, // add int(11)
  edit: { type: Number }, // edit int(11)
  deleteField: { type: Number }, // delete int(11)
  view: { type: Number }, // view int(11)
  email: { type: Number }, // email int(11)
  timestamp: { type: Date }, // timestamp timestamp
}, { timestamps: false })

export default mongoose.model('Userrights', UserrightsSchema, 'userrights')
