import mongoose from 'mongoose'
const { Schema } = mongoose

const NonconformanceinvestigationSchema = new Schema({
  id: { type: Number }, // id int(11)
  company: { type: Number }, // company int(11)
  rootanalysis: { type: String }, // rootanalysis varchar(255)
  rootcause: { type: String }, // rootcause varchar(255)
  person: { type: String }, // person varchar(255)
  corrective: { type: String }, // corrective varchar(255)
  preventive: { type: String }, // preventive varchar(255)
  employeeId: { type: Number }, // employee_id int(11)
  closuredate: { type: Date }, // closuredate date
  comments: { type: String }, // comments varchar(255)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  uploaddatetime: { type: Date }, // uploaddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  approvedby: { type: Number }, // approvedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  departmentid: { type: Number }, // departmentid int(11)
  approveddatetime: { type: Date }, // approveddatetime datetime
  status: { type: String }, // status varchar(255)
  attachment: { type: String }, // attachment varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  reportid: { type: Number }, // reportid int(11)
  investigationdate: { type: Date }, // investigationdate date
}, { timestamps: false })

export default mongoose.model('Nonconformanceinvestigation', NonconformanceinvestigationSchema, 'nonconformanceinvestigation')
