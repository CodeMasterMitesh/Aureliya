import mongoose from 'mongoose'
const { Schema } = mongoose

const TdsmasterSchema = new Schema({
  id: { type: Number }, // id int(10)
  name: { type: String }, // name varchar(255)
  description: { type: String }, // description text
  per: { type: Number }, // per float
}, { timestamps: false })

export default mongoose.model('Tdsmaster', TdsmasterSchema, 'tdsmaster')
