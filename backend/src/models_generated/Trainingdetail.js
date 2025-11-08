import mongoose from 'mongoose'
const { Schema } = mongoose

const TrainingdetailSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  duration: { type: String }, // duration varchar(255)
  startdate: { type: Date }, // startdate date
  enddate: { type: Date }, // enddate date
  department: { type: String }, // department varchar(255)
  traningsalary: { type: String }, // traningsalary varchar(255)
}, { timestamps: false })

export default mongoose.model('Trainingdetail', TrainingdetailSchema, 'trainingdetail')
