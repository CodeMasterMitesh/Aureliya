import mongoose from 'mongoose'
const { Schema } = mongoose

const OpeningleavebalanceSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  name: { type: String }, // name varchar(255)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  date: { type: Date }, // date date
  eid: { type: Number }, // eid int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  action: { type: String }, // action varchar(20)
  el: { type: Number }, // el float
  le: { type: Number }, // le float
  pl: { type: Number }, // pl float
  sl: { type: Number }, // sl float
  cl: { type: Number }, // cl float
}, { timestamps: false })

export default mongoose.model('Openingleavebalance', OpeningleavebalanceSchema, 'openingleavebalance')
