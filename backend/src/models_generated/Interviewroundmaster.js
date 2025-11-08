import mongoose from 'mongoose'
const { Schema } = mongoose

const InterviewroundmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  positionId: { type: Number }, // position_id int(11)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  positionrights: { type: String }, // positionrights longtext
  code: { type: Number }, // code int(11)
  sort: { type: Number }, // sort int(11)
}, { timestamps: false })

export default mongoose.model('Interviewroundmaster', InterviewroundmasterSchema, 'interviewroundmaster')
