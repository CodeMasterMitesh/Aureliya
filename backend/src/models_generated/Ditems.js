import mongoose from 'mongoose'
const { Schema } = mongoose

const DitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  documentid: { type: Number }, // documentid int(11)
  name: { type: String }, // name varchar(255)
  attach: { type: String }, // attach text
  img: { type: String }, // img varchar(255)
}, { timestamps: false })

export default mongoose.model('Ditems', DitemsSchema, 'ditems')
