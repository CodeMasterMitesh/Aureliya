import mongoose from 'mongoose'
const { Schema } = mongoose

const AssignshiftSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  active: { type: Number }, // active int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  shiftid: { type: Number }, // shiftid int(11)
  eid: { type: Number }, // eid int(11)
  date: { type: Date }, // date date
  remarks: { type: String }, // remarks varchar(255)
}, { timestamps: false })

export default mongoose.model('Assignshift', AssignshiftSchema, 'assignshift')
