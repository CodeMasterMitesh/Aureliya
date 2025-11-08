import mongoose from 'mongoose'
const { Schema } = mongoose

const NonconformancereportingSchema = new Schema({
  id: { type: Number }, // id int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  uploaddatetime: { type: Date }, // uploaddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  approvedby: { type: Number }, // approvedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  approveddatetime: { type: Date }, // approveddatetime datetime
  employeeId: { type: Number }, // employee_id int(11)
  departmentid: { type: Number }, // departmentid int(11)
  issuedate: { type: Date }, // issuedate date
  batchno: { type: String }, // batchno varchar(255)
  nctype: { type: String }, // nctype varchar(255)
  description: { type: String }, // description varchar(255)
  detectedDuring: { type: String }, // detected_during varchar(255)
  immediateaction: { type: String }, // immediateaction varchar(255)
  status: { type: String }, // status varchar(255)
  attachment: { type: String }, // attachment varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  productname: { type: String }, // productname varchar(255)
}, { timestamps: false })

export default mongoose.model('Nonconformancereporting', NonconformancereportingSchema, 'nonconformancereporting')
