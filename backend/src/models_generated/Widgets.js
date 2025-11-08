import mongoose from 'mongoose'
const { Schema } = mongoose

const WidgetsSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(25)
  moduleid: { type: Number }, // moduleid int(11)
}, { timestamps: false })

export default mongoose.model('Widgets', WidgetsSchema, 'widgets')
