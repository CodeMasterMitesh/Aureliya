import mongoose from 'mongoose'
const { Schema } = mongoose

const EmployeeperformanceSchema = new Schema({
  id: { type: Number }, // id int(11)
  employee: { type: Number }, // employee int(11)
  date: { type: Date }, // date date
  month: { type: Number }, // month int(11)
  year: { type: Number }, // year int(11)
  job: { type: Number }, // job int(11)
  jobcomments: { type: String }, // jobcomments varchar(50)
  work: { type: Number }, // work int(11)
  workcomments: { type: String }, // workcomments varchar(50)
  attendance: { type: Number }, // attendance int(11)
  attendancecomments: { type: String }, // attendancecomments varchar(50)
  initiative: { type: Number }, // initiative int(11)
  initiativecomments: { type: String }, // initiativecomments varchar(50)
  skills: { type: Number }, // skills int(11)
  skillscomments: { type: String }, // skillscomments varchar(50)
  dependability: { type: Number }, // dependability int(11)
  dependabilitycomments: { type: String }, // dependabilitycomments varchar(50)
  additional: { type: String }, // additional varchar(50)
  goal: { type: String }, // goal varchar(50)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  management: { type: Number }, // management int(11)
}, { timestamps: false })

export default mongoose.model('Employeeperformance', EmployeeperformanceSchema, 'employeeperformance')
