import mongoose from 'mongoose'
const { Schema } = mongoose

const LeavedetailSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  reason: { type: String }, // reason text
  startdate: { type: Date }, // startdate date
  enddate: { type: Date }, // enddate datetime
  status: { type: Number }, // status int(11)
  typeField: { type: String }, // type varchar(11)
  deleteField: { type: Number }, // delete int(11)
  approvedby: { type: Number }, // approvedby int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  approved: { type: String }, // approved varchar(50)
  nominee: { type: Number }, // nominee int(11)
  nomineeapproved: { type: String }, // nomineeapproved varchar(15)
  hodapproved: { type: String }, // hodapproved varchar(15)
  adminapproved: { type: String }, // adminapproved varchar(15)
  approved2: { type: String }, // approved2 varchar(15)
  date: { type: Date }, // date date
}, { timestamps: false })

export default mongoose.model('Leavedetail', LeavedetailSchema, 'leavedetail')
