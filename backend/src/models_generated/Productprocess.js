import mongoose from 'mongoose'
const { Schema } = mongoose

const ProductprocessSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  name: { type: Number }, // name int(11)
  sortno: { type: Number }, // sortno int(11)
  rawMaterial: { type: Number }, // raw_material int(11)
  qty: { type: Number }, // qty int(11)
  processtime: { type: String }, // processtime varchar(255)
}, { timestamps: false })

export default mongoose.model('Productprocess', ProductprocessSchema, 'productprocess')
