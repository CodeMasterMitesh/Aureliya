import mongoose from 'mongoose'
const { Schema } = mongoose

const PackagesSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  desc: { type: String }, // desc varchar(1024)
  service: { type: Number }, // service int(11)
  items: { type: String }, // items varchar(1024)
  price: { type: String }, // price varchar(1024)
  qty: { type: String }, // qty varchar(1024)
  fid: { type: Number }, // fid int(11)
}, { timestamps: false })

export default mongoose.model('Packages', PackagesSchema, 'packages')
