import mongoose from 'mongoose'
const { Schema } = mongoose

const EmployeementdetailsSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeid: { type: Number }, // employeeid int(11)
  organization: { type: String }, // organization varchar(100)
  address: { type: String }, // address varchar(200)
  fromemp: { type: String }, // fromemp varchar(50)
  toemp: { type: String }, // toemp varchar(50)
  designation: { type: String }, // designation varchar(200)
  reasonofleaving: { type: String }, // reasonofleaving varchar(255)
  ctc: { type: String }, // ctc varchar(50)
}, { timestamps: false })

export default mongoose.model('Employeementdetails', EmployeementdetailsSchema, 'employeementdetails')
