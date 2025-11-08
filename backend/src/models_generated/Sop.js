import mongoose from 'mongoose'
const { Schema } = mongoose

const SopSchema = new Schema({
  id: { type: Number }, // id int(11)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  name: { type: String }, // name varchar(50)
  date: { type: Date }, // date date
  attachment: { type: String }, // attachment varchar(250)
  attachment2: { type: String }, // attachment2 varchar(250)
  attachment3: { type: String }, // attachment3 varchar(250)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Sop', SopSchema, 'sop')
