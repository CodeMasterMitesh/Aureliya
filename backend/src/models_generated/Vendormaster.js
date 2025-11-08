import mongoose from 'mongoose'
const { Schema } = mongoose

const VendormasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  address: { type: String }, // address text
  contactno: { type: String }, // contactno varchar(255)
  email: { type: String }, // email varchar(255)
  category: { type: String }, // category varchar(255)
}, { timestamps: false })

export default mongoose.model('Vendormaster', VendormasterSchema, 'vendormaster')
