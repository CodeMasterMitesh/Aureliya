import mongoose from 'mongoose'
const { Schema } = mongoose

const NotinterestedreasonSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  active: { type: Number }, // active int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  longname: { type: String }, // longname varchar(200)
  shortname: { type: String }, // shortname varchar(200)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
}, { timestamps: false })

export default mongoose.model('Notinterestedreason', NotinterestedreasonSchema, 'notinterestedreason')
