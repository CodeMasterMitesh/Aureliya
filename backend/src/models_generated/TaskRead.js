import mongoose from 'mongoose'
const { Schema } = mongoose

const TaskReadSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  active: { type: Number }, // active int(11)
  userId: { type: Number }, // user_id int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  taskId: { type: Number }, // task_id int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  readStatus: { type: Number }, // read_status int(11)
}, { timestamps: false })

export default mongoose.model('TaskRead', TaskReadSchema, 'task_read')
