import mongoose from 'mongoose'
const { Schema } = mongoose

const MethodmasterSchema = new Schema({
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  name: { type: String }, // name varchar(50)
  description: { type: String }, // description varchar(255)
  code: { type: String }, // code varchar(255)
  pharmacopeiaid: { type: Number }, // pharmacopeiaid int(11)
  id: { type: Number }, // id int(11)
  indexno: { type: String }, // indexno varchar(50)
  pageno: { type: String }, // pageno varchar(50)
}, { timestamps: false })

export default mongoose.model('Methodmaster', MethodmasterSchema, 'methodmaster')
