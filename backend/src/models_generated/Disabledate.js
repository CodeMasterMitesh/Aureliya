import mongoose from 'mongoose'
const { Schema } = mongoose

const DisabledateSchema = new Schema({
  id: { type: Number }, // id int(11)
  value: { type: String }, // value varchar(20)
  date: { type: Date }, // date date
}, { timestamps: false })

export default mongoose.model('Disabledate', DisabledateSchema, 'disabledate')
