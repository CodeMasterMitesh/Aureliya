import mongoose from 'mongoose'
const { Schema } = mongoose

const NewmaterialmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  mid: { type: Number }, // mid int(11)
  typeField: { type: String }, // type varchar(20)
  name: { type: String }, // name varchar(255)
  code: { type: String }, // code varchar(25)
  convname: { type: String }, // convname varchar(255)
  qty: { type: String }, // qty varchar(25)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Newmaterialmaster', NewmaterialmasterSchema, 'newmaterialmaster')
