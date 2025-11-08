import mongoose from 'mongoose'
const { Schema } = mongoose

const AutoresponceSchema = new Schema({
  id: { type: Number }, // id int(11)
  cid: { type: Number }, // cid int(11)
  options: { type: String }, // options text
}, { timestamps: false })

export default mongoose.model('Autoresponce', AutoresponceSchema, 'autoresponce')
