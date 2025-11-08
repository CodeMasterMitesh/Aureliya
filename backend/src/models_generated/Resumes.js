import mongoose from 'mongoose'
const { Schema } = mongoose

const ResumesSchema = new Schema({
  id: { type: Number }, // id int(11)
  vacanciesId: { type: Number }, // vacancies_id int(11)
  name: { type: String }, // name varchar(255)
  file: { type: String }, // file varchar(255)
  status: { type: Number }, // status int(11)
}, { timestamps: false })

export default mongoose.model('Resumes', ResumesSchema, 'resumes')
