import mongoose from 'mongoose'
const { Schema } = mongoose

const OldpurchaseSchema = new Schema({
  id: { type: Number }, // id int(11)
  chemicalcode: { type: String }, // chemicalcode varchar(100)
  productname: { type: String }, // productname varchar(255)
  make: { type: String }, // make varchar(100)
  batchno: { type: String }, // batchno varchar(100)
  usebefore: { type: String }, // usebefore varchar(100)
  openingdt: { type: String }, // openingdt varchar(100)
  expdt: { type: String }, // expdt varchar(100)
  grade: { type: String }, // grade varchar(100)
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Oldpurchase', OldpurchaseSchema, 'oldpurchase')
