import mongoose from 'mongoose'
const { Schema } = mongoose

const ServicesSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  desc: { type: String }, // desc varchar(255)
  price: { type: String }, // price varchar(255)
  category: { type: String }, // category varchar(255)
  active: { type: Number }, // active int(11)
  days: { type: Number }, // days int(11)
  salestax: { type: Number }, // salestax int(11)
  fid: { type: Number }, // fid int(11)
}, { timestamps: false })

export default mongoose.model('Services', ServicesSchema, 'services')
