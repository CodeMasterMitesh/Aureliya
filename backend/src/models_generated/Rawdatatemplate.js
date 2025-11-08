import mongoose from 'mongoose'
const { Schema } = mongoose

const RawdatatemplateSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  description: { type: String }, // description text
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  typeField: { type: String }, // type varchar(10)
}, { timestamps: false })

export default mongoose.model('Rawdatatemplate', RawdatatemplateSchema, 'rawdatatemplate')
