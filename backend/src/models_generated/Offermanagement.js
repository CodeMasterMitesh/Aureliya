import mongoose from 'mongoose'
const { Schema } = mongoose

const OffermanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  candidateid: { type: Number }, // candidateid int(11)
  jobrequisitionid: { type: Number }, // jobrequisitionid int(11)
  offerdate: { type: Date }, // offerdate date
  offerstatus: { type: String }, // offerstatus varchar(255)
  joiningdate: { type: Date }, // joiningdate date
  salaryoffered: { type: Number }, // salaryoffered decimal(25
  offerletter: { type: String }, // offerletter varchar(255)
  remarks: { type: String }, // remarks text
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  deleteField: { type: Boolean }, // delete tinyint(1)
  active: { type: Boolean }, // active tinyint(1)
  salarySlip1: { type: String }, // salary_slip1 varchar(255)
  salarySlip2: { type: String }, // salary_slip2 varchar(255)
  salarySlip3: { type: String }, // salary_slip3 varchar(255)
  experienceLetter: { type: String }, // experience_letter varchar(255)
  relievingLetter: { type: String }, // relieving_letter varchar(255)
  approvedby: { type: Number }, // approvedby int(11)
  approvedby1: { type: Number }, // approvedby1 int(11)
  approvedby2: { type: Number }, // approvedby2 int(11)
  approved: { type: String }, // approved varchar(255)
  approved1: { type: String }, // approved1 varchar(255)
  approved2: { type: String }, // approved2 varchar(255)
  approveddatetime: { type: Date }, // approveddatetime datetime
  approved1datetime: { type: Date }, // approved1datetime datetime
  approved2datetime: { type: Date }, // approved2datetime datetime
  declineReasonId: { type: Number }, // decline_reason_id int(11)
}, { timestamps: false })

export default mongoose.model('Offermanagement', OffermanagementSchema, 'offermanagement')
