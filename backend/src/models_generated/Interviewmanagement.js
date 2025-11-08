import mongoose from 'mongoose'
const { Schema } = mongoose

const InterviewmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  jobrequisitionid: { type: Number }, // jobrequisitionid int(11)
  cid: { type: Number }, // cid int(11)
  interviewdate: { type: Date }, // interviewdate date
  interviewtime: { type: String }, // interviewtime time
  interviewpanel: { type: String }, // interviewpanel varchar(255)
  interviewmode: { type: String }, // interviewmode varchar(25)
  interviewstatus: { type: String }, // interviewstatus varchar(25)
  interviewerfeedback: { type: String }, // interviewerfeedback text
  remarks: { type: String }, // remarks text
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  deleteField: { type: Boolean }, // delete tinyint(1)
  active: { type: Boolean }, // active tinyint(1)
  interviewroundid: { type: Number }, // interviewroundid int(11)
}, { timestamps: false })

export default mongoose.model('Interviewmanagement', InterviewmanagementSchema, 'interviewmanagement')
