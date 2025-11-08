import mongoose from 'mongoose'
const { Schema } = mongoose

const EmployeequcationdetailsSchema = new Schema({
  id: { type: Number }, // id int(11)
  course: { type: String }, // course varchar(50)
  institute: { type: String }, // institute varchar(50)
  board: { type: String }, // board varchar(50)
  passingyear: { type: String }, // passingyear varchar(50)
  employeeId: { type: Number }, // employee_id int(11)
  fromequ: { type: String }, // fromequ varchar(50)
  toequ: { type: String }, // toequ varchar(50)
  grade: { type: String }, // grade varchar(50)
  specialization: { type: String }, // specialization varchar(255)
}, { timestamps: false })

export default mongoose.model('Employeequcationdetails', EmployeequcationdetailsSchema, 'employeequcationdetails')
