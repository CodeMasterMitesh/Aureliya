import mongoose from 'mongoose'
const { Schema } = mongoose

const Products300516Schema = new Schema({
  id: { type: Number }, // id int(11)
  productname: { type: String }, // productname text
  producttype: { type: String }, // producttype varchar(50)
  marker: { type: String }, // marker varchar(100)
  genricname: { type: String }, // genricname varchar(50)
  packingdetail: { type: String }, // packingdetail varchar(10)
  description: { type: String }, // description varchar(100)
  pharmacopiea: { type: String }, // pharmacopiea varchar(255)
  unit: { type: String }, // unit varchar(25)
}, { timestamps: false })

export default mongoose.model('Products300516', Products300516Schema, 'products_30/05/16')
