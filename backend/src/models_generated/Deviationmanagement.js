import mongoose from 'mongoose'
const { Schema } = mongoose

const DeviationmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  title: { type: String }, // title varchar(255)
  typeField: { type: String }, // type varchar(255)
  description: { type: String }, // description varchar(25)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  employeeid: { type: Number }, // employeeid int(11)
  root: { type: String }, // root varchar(255)
  date: { type: Date }, // date date
  impactassessment: { type: String }, // impactassessment varchar(255)
  correctiveaction: { type: String }, // correctiveaction varchar(255)
  preventiveaction: { type: String }, // preventiveaction varchar(255)
  closedate: { type: Date }, // closedate date
  review: { type: String }, // review varchar(255)
}, { timestamps: false })

export default mongoose.model('Deviationmanagement', DeviationmanagementSchema, 'deviationmanagement')
