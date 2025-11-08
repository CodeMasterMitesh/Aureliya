import mongoose from 'mongoose'
const { Schema } = mongoose

const AttendanceSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  attendancedate: { type: Date }, // attendancedate date
  attendance: { type: String }, // attendance varchar(255)
  intime: { type: String }, // intime time
  outtime: { type: String }, // outtime time
}, { timestamps: false })

export default mongoose.model('Attendance', AttendanceSchema, 'attendance')
