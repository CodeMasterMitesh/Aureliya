import mongoose from 'mongoose'
const { Schema } = mongoose

const GodownSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(50)
  address: { type: String }, // address varchar(255)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  brand: { type: Number }, // brand int(11)
  yesno: { type: String }, // yesno varchar(25)
}, { timestamps: false })

export default mongoose.model('Godown', GodownSchema, 'godown')
