import mongoose from 'mongoose'
const { Schema } = mongoose

const UsersettingsSchema = new Schema({
  id: { type: Number }, // id int(11)
  eid: { type: Number }, // eid int(11)
  name: { type: String }, // name varchar(255)
  value: { type: String }, // value varchar(255)
}, { timestamps: false })

export default mongoose.model('Usersettings', UsersettingsSchema, 'usersettings')
