import mongoose from 'mongoose'
const { Schema } = mongoose

const PrinttempleteSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  name: { type: String }, // name varchar(50)
  typeField: { type: String }, // type varchar(50)
  header: { type: String }, // header varchar(50)
  footer: { type: String }, // footer varchar(50)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  enterdatetime: { type: Date }, // enterdatetime datetime
  watermark: { type: String }, // watermark varchar(100)
  code: { type: String }, // code varchar(15)
  number: { type: String }, // number varchar(15)
}, { timestamps: false })

export default mongoose.model('Printtemplete', PrinttempleteSchema, 'printtemplete')
