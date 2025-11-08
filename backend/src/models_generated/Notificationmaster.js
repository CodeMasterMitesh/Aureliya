import mongoose from 'mongoose'
const { Schema } = mongoose

const NotificationmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  typeField: { type: String }, // type varchar(50)
  module: { type: Number }, // module int(11)
  to: { type: String }, // to varchar(50)
  user: { type: String }, // user text
  position: { type: Number }, // position int(11)
  department: { type: Number }, // department int(11)
  subject: { type: String }, // subject varchar(50)
  trigger: { type: String }, // trigger varchar(50)
  company: { type: Number }, // company int(11)
  body: { type: String }, // body longtext
  software: { type: Number }, // software int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
}, { timestamps: false })

export default mongoose.model('Notificationmaster', NotificationmasterSchema, 'notificationmaster')
