import mongoose from 'mongoose'
const { Schema } = mongoose

const Leavedetail1Schema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  reason: { type: String }, // reason text
  startdate: { type: Date }, // startdate datetime
  enddate: { type: Date }, // enddate datetime
  status: { type: Number }, // status int(11)
  typeField: { type: String }, // type varchar(11)
}, { timestamps: false })

export default mongoose.model('Leavedetail1', Leavedetail1Schema, 'leavedetail1')
