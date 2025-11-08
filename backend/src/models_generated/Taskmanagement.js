import mongoose from 'mongoose'
const { Schema } = mongoose

const TaskmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  assigntouser: { type: Number }, // assigntouser int(11)
  site: { type: Number }, // site int(11)
  tasktype: { type: Number }, // tasktype int(11)
  priority: { type: String }, // priority text
  subject: { type: String }, // subject text
  description: { type: String }, // description text
  startdate: { type: Date }, // startdate datetime
  repeatid: { type: Number }, // repeatid int(11)
  remark: { type: String }, // remark text
  attachment: { type: String }, // attachment varchar(255)
  attachment1: { type: String }, // attachment1 varchar(255)
  typeField: { type: String }, // type varchar(10)
  attachment2: { type: String }, // attachment2 varchar(255)
  occurrence: { type: String }, // occurrence varchar(10)
  enddate: { type: Date }, // enddate datetime
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  repeatday: { type: String }, // repeatday varchar(12)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedtimeby: { type: Number }, // modifiedtimeby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  status: { type: String }, // status varchar(100)
  comments: { type: String }, // comments varchar(255)
  entrytype: { type: String }, // entrytype varchar(20)
  ccUserId: { type: String }, // cc_user_id varchar(100)
  repeatdte: { type: Number }, // repeatdte int(11)
  krakpi: { type: Number }, // krakpi int(11)
  cctext: { type: String }, // cctext varchar(255)
  compilationdatetime: { type: Date }, // compilationdatetime datetime
  completeby: { type: Number }, // completeby int(11)
  voiceNote: { type: String }, // voice_note varchar(255)
}, { timestamps: false })

export default mongoose.model('Taskmanagement', TaskmanagementSchema, 'taskmanagement')
