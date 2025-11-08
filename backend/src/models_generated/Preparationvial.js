import mongoose from 'mongoose'
const { Schema } = mongoose

const PreparationvialSchema = new Schema({
  id: { type: Number }, // id int(11)
  preparationid: { type: Number }, // preparationid int(11)
  branch: { type: Number }, // branch int(11)
  godown: { type: Number }, // godown int(11)
  refid: { type: String }, // refid varchar(50)
  qty: { type: Number }, // qty float
  racno: { type: String }, // racno varchar(255)
  vial: { type: String }, // vial varchar(255)
  unit: { type: String }, // unit varchar(255)
  status: { type: String }, // status varchar(50)
  opendate: { type: Date }, // opendate date
  expdate: { type: Date }, // expdate date
}, { timestamps: false })

export default mongoose.model('Preparationvial', PreparationvialSchema, 'preparationvial')
