import mongoose from 'mongoose'
const { Schema } = mongoose

const JobrequisitionmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  jobtitle: { type: String }, // jobtitle varchar(255)
  workingtype: { type: String }, // workingtype varchar(255)
  jobtype: { type: String }, // jobtype varchar(255)
  departmentid: { type: Number }, // departmentid int(11)
  employeeId: { type: Number }, // employee_id int(11)
  designation: { type: Number }, // designation int(11)
  noofpositions: { type: Number }, // noofpositions int(11)
  jobdescription: { type: String }, // jobdescription text
  employmenttype: { type: String }, // employmenttype varchar(50)
  salaryrange: { type: String }, // salaryrange varchar(100)
  approvedby: { type: Number }, // approvedby int(11)
  priority: { type: String }, // priority varchar(50)
  salaryoffered: { type: String }, // salaryoffered varchar(50)
  reasonforhiring: { type: String }, // reasonforhiring text
  postingdate: { type: Date }, // postingdate date
  closingdate: { type: Date }, // closingdate date
  remarks: { type: String }, // remarks text
  status: { type: String }, // status varchar(50)
  description: { type: String }, // description text
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  approved1: { type: String }, // approved1 varchar(50)
  column36: { type: String }, // Column 36 varchar(50)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  positionId: { type: Number }, // position_id int(11)
  budget: { type: String }, // budget varchar(50)
  minsalary: { type: String }, // minsalary varchar(50)
  maxsalary: { type: String }, // maxsalary varchar(50)
  minexperience: { type: String }, // minexperience varchar(50)
  maxexperience: { type: String }, // maxexperience varchar(50)
  experience: { type: String }, // experience varchar(50)
  approved: { type: String }, // approved varchar(255)
  approveddatetime: { type: Date }, // approveddatetime timestamp
  approveddatetime1: { type: Date }, // approveddatetime1 timestamp
  approvedby1: { type: Number }, // approvedby1 int(11)
}, { timestamps: false })

export default mongoose.model('Jobrequisitionmanagement', JobrequisitionmanagementSchema, 'jobrequisitionmanagement')
