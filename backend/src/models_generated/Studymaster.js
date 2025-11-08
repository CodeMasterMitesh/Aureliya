import mongoose from 'mongoose'
const { Schema } = mongoose

const StudymasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  productid: { type: Number }, // productid int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  name: { type: String }, // name varchar(255)
  code: { type: String }, // code varchar(255)
  description: { type: String }, // description varchar(255)
}, { timestamps: false })

export default mongoose.model('Studymaster', StudymasterSchema, 'studymaster')
