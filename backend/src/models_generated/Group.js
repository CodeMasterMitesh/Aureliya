import mongoose from 'mongoose'
const { Schema } = mongoose

const GroupSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(25)
  address: { type: String }, // address varchar(255)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  yesno: { type: String }, // yesno varchar(50)
  action: { type: Number }, // action int(11)
}, { timestamps: false })

export default mongoose.model('Group', GroupSchema, 'group')
