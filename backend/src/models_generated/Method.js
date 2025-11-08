import mongoose from 'mongoose'
const { Schema } = mongoose

const MethodSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  typeField: { type: String }, // type varchar(100)
  file1: { type: String }, // file1 varchar(255)
  file2: { type: String }, // file2 varchar(255)
  file3: { type: String }, // file3 varchar(255)
  file4: { type: String }, // file4 varchar(255)
  date: { type: Date }, // date date
  description: { type: String }, // description text
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  approved: { type: String }, // approved varchar(15)
  method: { type: String }, // method text
  version: { type: Number }, // version int(11)
}, { timestamps: false })

export default mongoose.model('Method', MethodSchema, 'method')
