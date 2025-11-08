import mongoose from 'mongoose'
const { Schema } = mongoose

const DesignationSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  minexperience: { type: String }, // minexperience varchar(255)
  rolesandresponsbility: { type: String }, // rolesandresponsbility varchar(255)
  qualification: { type: String }, // qualification varchar(255)
  skillrequired: { type: String }, // skillrequired varchar(255)
  maxexperience: { type: String }, // maxexperience varchar(255)
  minsalary: { type: String }, // minsalary varchar(255)
  maxsalary: { type: String }, // maxsalary varchar(255)
  positionid: { type: Number }, // positionid int(11)
  departmentid: { type: Number }, // departmentid int(11)
  location: { type: String }, // location varchar(255)
  remarks: { type: String }, // remarks varchar(255)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  code: { type: Number }, // code int(11)
  sort: { type: Number }, // sort int(11)
}, { timestamps: false })

export default mongoose.model('Designation', DesignationSchema, 'designation')
