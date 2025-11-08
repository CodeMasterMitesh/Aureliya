import mongoose from 'mongoose'
const { Schema } = mongoose

const DocumenttypeSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  code: { type: String }, // code varchar(255)
  sort: { type: Number }, // sort int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Documenttype', DocumenttypeSchema, 'documenttype')
