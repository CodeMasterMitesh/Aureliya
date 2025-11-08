import mongoose from 'mongoose'
const { Schema } = mongoose

const TrainingScheduleSchema = new Schema({
  id: { type: Number }, // id int(11)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  action: { type: String }, // action varchar(15)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  startdate: { type: Date }, // startdate date
  enddate: { type: Date }, // enddate date
  employeeId: { type: Number }, // employee_id int(11)
  courseId: { type: Number }, // course_id int(11)
}, { timestamps: false })

export default mongoose.model('TrainingSchedule', TrainingScheduleSchema, 'training_schedule')
