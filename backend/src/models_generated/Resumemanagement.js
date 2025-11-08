import mongoose from 'mongoose'
const { Schema } = mongoose

const ResumemanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  email: { type: String }, // email varchar(255)
  phonenumber: { type: String }, // phonenumber varchar(15)
  status: { type: String }, // status varchar(15)
  resumeFile: { type: String }, // resume_file varchar(255)
  appliedposition: { type: String }, // appliedposition varchar(255)
  jobrequisitionid: { type: Number }, // jobrequisitionid int(11)
  resumemanagement: { type: String }, // resumemanagement varchar(50)
  applicationdate: { type: Date }, // applicationdate date
  resumestatus: { type: String }, // resumestatus varchar(255)
  remarks: { type: String }, // remarks text
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  deleteField: { type: Boolean }, // delete tinyint(1)
  active: { type: Boolean }, // active tinyint(1)
  gender: { type: String }, // gender varchar(50)
  dateofbirth: { type: Date }, // dateofbirth date
  qualification: { type: String }, // qualification varchar(50)
  experience: { type: String }, // experience varchar(50)
  address: { type: String }, // address text
  skills: { type: String }, // skills varchar(50)
  expectedSalary: { type: String }, // expected_salary varchar(50)
  currentJobTitle: { type: String }, // current_job_title varchar(50)
  currentEmployer: { type: String }, // current_employer varchar(50)
  noticePeriod: { type: String }, // notice_period varchar(50)
}, { timestamps: false })

export default mongoose.model('Resumemanagement', ResumemanagementSchema, 'resumemanagement')
