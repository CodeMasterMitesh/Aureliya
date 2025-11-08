import mongoose from 'mongoose'
const { Schema } = mongoose

const RequestSchema = new Schema({
  id: { type: Number }, // id int(11)
  remarks: { type: String }, // remarks text
  status: { type: String }, // status varchar(11)
  typeField: { type: String }, // type varchar(11)
  approved1: { type: String }, // approved1 varchar(25)
  enterby: { type: Number }, // enterby int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  approved1by: { type: Number }, // approved1by int(11)
  approved1datetime: { type: Date }, // approved1datetime datetime
  approved2: { type: String }, // approved2 varchar(25)
  approved2by: { type: Number }, // approved2by int(11)
  approved2datetime: { type: Date }, // approved2datetime datetime
  hrremarks: { type: String }, // hrremarks text
  adminremarks: { type: String }, // adminremarks text
  att1: { type: String }, // att1 varchar(255)
  att2: { type: String }, // att2 varchar(255)
  leaveFrom: { type: Date }, // leave_from date
  leaveTo: { type: Date }, // leave_to date
  misspunchDatetime: { type: Date }, // misspunch_datetime datetime
  requestdate: { type: Date }, // requestdate date
  halfdayType: { type: String }, // halfday_type varchar(15)
  requesttype: { type: String }, // requesttype varchar(50)
  name: { type: String }, // name varchar(50)
  description: { type: String }, // description varchar(50)
  datetime: { type: Date }, // datetime datetime
  reminderdate: { type: Date }, // reminderdate datetime
}, { timestamps: false })

export default mongoose.model('Request', RequestSchema, 'request')
