import mongoose from 'mongoose'
const { Schema } = mongoose

const PricerateSchema = new Schema({
  id: { type: Number }, // id int(11)
  date: { type: Date }, // date date
  pgold24k: { type: Number }, // pgold24k float
  pgold22k: { type: Number }, // pgold22k float
  pgold20k: { type: Number }, // pgold20k float
  pgold18k: { type: Number }, // pgold18k float
  pgold14k: { type: Number }, // pgold14k float
  pgold12k: { type: Number }, // pgold12k float
  psilver100: { type: Number }, // psilver100 float
  psilver995: { type: Number }, // psilver99_5 float
  psilver90: { type: Number }, // psilver90 float
  sgold24k: { type: Number }, // sgold24k float
  sgold22k: { type: Number }, // sgold22k float
  sgold20k: { type: Number }, // sgold20k float
  sgold18k: { type: Number }, // sgold18k float
  sgold14k: { type: Number }, // sgold14k float
  sgold12k: { type: Number }, // sgold12k float
  ssilver100: { type: Number }, // ssilver100 float
  ssilver995: { type: Number }, // ssilver99_5 float
  ssilver90: { type: Number }, // ssilver90 float
}, { timestamps: false })

export default mongoose.model('Pricerate', PricerateSchema, 'pricerate')
