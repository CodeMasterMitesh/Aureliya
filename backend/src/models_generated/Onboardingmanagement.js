import mongoose from 'mongoose'
const { Schema } = mongoose

const OnboardingmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  candidateid: { type: Number }, // candidateid int(11)
  jobrequisitionid: { type: Number }, // jobrequisitionid int(11)
  joiningdate: { type: Date }, // joiningdate date
  documentsubmissionstatus: { type: String }, // documentsubmissionstatus varchar(255)
  orientationdate: { type: Date }, // orientationdate date
  probationperiod: { type: Number }, // probationperiod int(11)
  probationstatus: { type: String }, // probationstatus varchar(255)
  remarks: { type: String }, // remarks text
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  deleteField: { type: Boolean }, // delete tinyint(1)
  active: { type: Boolean }, // active tinyint(1)
  approved: { type: String }, // approved varchar(255)
  approvedby: { type: Number }, // approvedby int(11)
  approveddatetime: { type: Date }, // approveddatetime datetime
}, { timestamps: false })

export default mongoose.model('Onboardingmanagement', OnboardingmanagementSchema, 'onboardingmanagement')
