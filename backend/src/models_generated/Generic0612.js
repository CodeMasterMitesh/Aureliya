import mongoose from 'mongoose'
const { Schema } = mongoose

const Generic0612Schema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  ippageno: { type: String }, // ippageno varchar(25)
  qty: { type: String }, // qty varchar(25)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  pharmacopoeiaid: { type: Number }, // pharmacopoeiaid int(11)
  url: { type: String }, // url varchar(255)
  textdata: { type: String }, // textdata longtext
  jsondata: { type: String }, // jsondata longtext
  txturl: { type: String }, // txturl varchar(255)
}, { timestamps: false })

export default mongoose.model('Generic0612', Generic0612Schema, 'generic-06-12')
