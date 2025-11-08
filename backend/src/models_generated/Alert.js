import mongoose from 'mongoose'
const { Schema } = mongoose

const AlertSchema = new Schema({
  id: { type: Number }, // id int(11)
  typeField: { type: Number }, // type int(11)
  name: { type: String }, // name varchar(255)
  description: { type: String }, // description varchar(255)
  read: { type: Number }, // read int(11)
  toid: { type: Number }, // toid int(11)
  fromid: { type: Number }, // fromid int(11)
  href: { type: Number }, // href int(11)
  refid: { type: Number }, // refid int(11)
  datetime: { type: Date }, // datetime datetime
  effectdatetime: { type: Date }, // effectdatetime datetime
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
}, { timestamps: false })

export default mongoose.model('Alert', AlertSchema, 'alert')
