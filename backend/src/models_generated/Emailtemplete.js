import mongoose from 'mongoose'
const { Schema } = mongoose

const EmailtempleteSchema = new Schema({
  id: { type: Number }, // id int(11)
  typeField: { type: String }, // type varchar(255)
  value: { type: String }, // value varchar(255)
  code: { type: String }, // code varchar(255)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  emailtempletedata: { type: String }, // emailtempletedata longtext
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
}, { timestamps: false })

export default mongoose.model('Emailtemplete', EmailtempleteSchema, 'emailtemplete')
