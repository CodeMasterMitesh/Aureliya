import mongoose from 'mongoose'
const { Schema } = mongoose

const PositionmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  departmentid: { type: Number }, // departmentid int(11)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  positionrights: { type: String }, // positionrights longtext
  rolsresponsibilities: { type: String }, // rolsresponsibilities text
  qualification: { type: String }, // qualification text
  skillsrequired: { type: String }, // skillsrequired text
  minexperiance: { type: String }, // minexperiance varchar(50)
  maxexperience: { type: String }, // maxexperience varchar(50)
  minsalary: { type: String }, // minsalary varchar(50)
  maxsalary: { type: String }, // maxsalary varchar(50)
  designation: { type: String }, // designation varchar(50)
  location: { type: String }, // location varchar(50)
  remarks: { type: String }, // remarks varchar(255)
}, { timestamps: false })

export default mongoose.model('Positionmaster', PositionmasterSchema, 'positionmaster')
