import mongoose from 'mongoose'
const { Schema } = mongoose

const MetalmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
}, { timestamps: false })

export default mongoose.model('Metalmaster', MetalmasterSchema, 'metalmaster')
