import mongoose from 'mongoose'
const { Schema } = mongoose

const OfferresaonmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  code: { type: String }, // code varchar(50)
  sort: { type: Number }, // sort int(11)
}, { timestamps: false })

export default mongoose.model('Offerresaonmaster', OfferresaonmasterSchema, 'offerresaonmaster')
