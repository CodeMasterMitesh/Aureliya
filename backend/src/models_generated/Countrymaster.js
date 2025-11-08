import mongoose from 'mongoose'
const { Schema } = mongoose

const CountrymasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  country: { type: String }, // country varchar(255)
}, { timestamps: false })

export default mongoose.model('Countrymaster', CountrymasterSchema, 'countrymaster')
