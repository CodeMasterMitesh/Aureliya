import mongoose from 'mongoose'
const { Schema } = mongoose

const TaxmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  plus: { type: String }, // plus varchar(50)
  order: { type: String }, // order varchar(50)
  rs: { type: String }, // %rs varchar(50)
  gross: { type: String }, // gross varchar(50)
}, { timestamps: false })

export default mongoose.model('Taxmaster', TaxmasterSchema, 'taxmaster')
