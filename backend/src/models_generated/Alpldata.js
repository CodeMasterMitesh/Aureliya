import mongoose from 'mongoose'
const { Schema } = mongoose

const AlpldataSchema = new Schema({
  category: { type: String }, // Category varchar(10)
  subCategory: { type: String }, // Sub-Category varchar(18)
  subSubCategory: { type: String }, // Sub-Sub Category varchar(17)
  laboratory: { type: String }, // Laboratory varchar(51)
  qty: { type: String }, // qty varchar(9)
  rate: { type: String }, // rate varchar(11)
  amount: { type: String }, // amount varchar(13)
  categoryid: { type: Number }, // categoryid int(11)
  subcategoryid: { type: Number }, // subcategoryid int(11)
  subsubcategoryid: { type: Number }, // subsubcategoryid int(11)
}, { timestamps: false })

export default mongoose.model('Alpldata', AlpldataSchema, 'alpldata')
