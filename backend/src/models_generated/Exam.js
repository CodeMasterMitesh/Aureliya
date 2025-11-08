import mongoose from 'mongoose'
const { Schema } = mongoose

const ExamSchema = new Schema({
  id: { type: Number }, // id bigint(20)
  code: { type: String }, // code varchar(255)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  deleteField: { type: Boolean }, // delete tinyint(1)
  active: { type: Boolean }, // active tinyint(1)
  sort: { type: Number }, // sort int(11)
  trainingScheduleId: { type: Number }, // training_schedule_id int(11)
  question: { type: String }, // question varchar(255)
}, { timestamps: false })

export default mongoose.model('Exam', ExamSchema, 'exam')
