import mongoose from 'mongoose'
const { Schema } = mongoose

const HrTrainingScheduleSchema = new Schema({
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
  courseid: { type: Number }, // courseid int(11)
  sectionid: { type: Number }, // sectionid int(11)
  startdatetime: { type: Date }, // startdatetime datetime
  enddatetime: { type: Date }, // enddatetime datetime
  trainingBy: { type: Boolean }, // training_by tinyint(1)
  trainingTo: { type: String }, // training_to varchar(50)
  skills: { type: String }, // skills varchar(50)
  remarks: { type: String }, // remarks varchar(255)
  trainingToName: { type: String }, // training_to_name varchar(255)
}, { timestamps: false })

export default mongoose.model('HrTrainingSchedule', HrTrainingScheduleSchema, 'hr_training_schedule')
