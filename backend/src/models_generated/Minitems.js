import mongoose from 'mongoose'
const { Schema } = mongoose

const MinitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  minid: { type: Number }, // minid int(11)
  mid: { type: Number }, // mid int(11)
  qty: { type: String }, // qty varchar(11)
  materialCat: { type: Number }, // material_cat int(11)
}, { timestamps: false })

export default mongoose.model('Minitems', MinitemsSchema, 'minitems')
