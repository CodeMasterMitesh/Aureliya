import mongoose from 'mongoose'
const { Schema } = mongoose

const SettingsSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  value: { type: String }, // value varchar(255)
  code: { type: String }, // code varchar(255)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
}, { timestamps: false })

export default mongoose.model('Settings', SettingsSchema, 'settings')
