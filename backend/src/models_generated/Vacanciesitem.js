import mongoose from 'mongoose'
const { Schema } = mongoose

const VacanciesitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  vacancieid: { type: Number }, // vacancieid int(11)
  name: { type: String }, // name varchar(255)
  qualification: { type: String }, // qualification varchar(255)
  expectedsalary: { type: String }, // expectedsalary varchar(255)
  resume: { type: String }, // resume varchar(255)
  photo: { type: String }, // photo varchar(255)
  stage: { type: String }, // stage varchar(255)
  stagedetail: { type: String }, // stagedetail varchar(255)
}, { timestamps: false })

export default mongoose.model('Vacanciesitem', VacanciesitemSchema, 'vacanciesitem')
