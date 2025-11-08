import mongoose from 'mongoose'
const { Schema } = mongoose

const CitymasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  city: { type: String }, // city varchar(255)
}, { timestamps: false })

export default mongoose.model('Citymaster', CitymasterSchema, 'citymaster')
