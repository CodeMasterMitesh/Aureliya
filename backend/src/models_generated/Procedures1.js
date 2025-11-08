import mongoose from 'mongoose'
const { Schema } = mongoose

const Procedures1Schema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  price: { type: String }, // price varchar(50)
}, { timestamps: false })

export default mongoose.model('Procedures1', Procedures1Schema, 'procedures1')
