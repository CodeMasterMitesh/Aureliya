import mongoose from 'mongoose'
const { Schema } = mongoose

const ProductmaterialSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  mid: { type: Number }, // mid int(11)
  qty: { type: Number }, // qty int(11)
  category: { type: Number }, // category int(11)
  subcategory: { type: Number }, // subcategory int(11)
}, { timestamps: false })

export default mongoose.model('Productmaterial', ProductmaterialSchema, 'productmaterial')
