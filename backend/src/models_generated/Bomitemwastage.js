import mongoose from 'mongoose'
const { Schema } = mongoose

const BomitemwastageSchema = new Schema({
  id: { type: Number }, // id int(11)
  bomid: { type: Number }, // bomid int(11)
  pid: { type: String }, // pid varchar(100)
  qty: { type: Number }, // qty double
}, { timestamps: false })

export default mongoose.model('Bomitemwastage', BomitemwastageSchema, 'bomitemwastage')
