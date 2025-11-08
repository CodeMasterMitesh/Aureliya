import mongoose from 'mongoose'
const { Schema } = mongoose

const TasksSchema = new Schema({
  id: { type: Number }, // id int(11)
  assignedUserId: { type: Number }, // assigned_user_id int(11)
  autoExtend: { type: Number }, // auto_extend int(11)
  completion: { type: Number }, // completion int(11)
  taskType: { type: String }, // task_type varchar(150)
  lead: { type: Number }, // lead int(11)
  empid: { type: String }, // empid varchar(255)
  subject: { type: String }, // subject varchar(255)
  starttime: { type: Date }, // starttime datetime
  endtime: { type: Date }, // endtime datetime
  priority: { type: String }, // priority varchar(100)
  description: { type: String }, // description text
  status: { type: String }, // status varchar(100)
  comments: { type: String }, // comments text
  tasktype: { type: String }, // tasktype varchar(255)
  clientid: { type: Number }, // clientid int(11)
  uid: { type: Number }, // uid int(11)
  timestamp: { type: Date }, // timestamp timestamp
  taskfor: { type: String }, // taskfor varchar(255)
  astarttime: { type: Date }, // astarttime datetime
  company: { type: Number }, // company int(11)
  contactid: { type: Number }, // contactid int(11)
  deal: { type: String }, // deal varchar(255)
  deacription: { type: String }, // deacription varchar(255)
  aendtime: { type: Date }, // aendtime datetime
  taskno: { type: String }, // taskno varchar(255)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  percentage: { type: Number }, // percentage int(11)
  deadlinetime: { type: Date }, // deadlinetime date
  status1: { type: String }, // status1 varchar(20)
}, { timestamps: false })

export default mongoose.model('Tasks', TasksSchema, 'tasks')
