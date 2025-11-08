import mongoose from 'mongoose'
const { Schema } = mongoose

const WeekoffSchema = new Schema({
  id: { type: Number }, // id int(11)
  date: { type: Date }, // date date
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  month: { type: Number }, // month int(11)
  year: { type: Number }, // year int(11)
  employeeid: { type: String }, // employeeid varchar(255)
  days: { type: String }, // days varchar(20)
}, { timestamps: false })

export default mongoose.model('Weekoff', WeekoffSchema, 'weekoff')
