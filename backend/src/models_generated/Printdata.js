import mongoose from 'mongoose'
const { Schema } = mongoose

const PrintdataSchema = new Schema({
  id: { type: Number }, // id int(11)
  data: { type: String }, // data longtext
}, { timestamps: false })

export default mongoose.model('Printdata', PrintdataSchema, 'printdata')
