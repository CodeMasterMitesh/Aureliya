import mongoose from 'mongoose'
const { Schema } = mongoose

const DepartmentsSchema = new Schema({
  id: { type: Number }, // id int(11)
  branchid: { type: Number }, // branchid int(11)
  name: { type: String }, // name varchar(255)
  departmentid: { type: Number }, // departmentid int(11)
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
}, { timestamps: false })

export default mongoose.model('Departments', DepartmentsSchema, 'departments')
