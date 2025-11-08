import mongoose from 'mongoose'
const { Schema } = mongoose

const LabincidentreportingprocessSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  location: { type: String }, // location varchar(50)
  incidentDescription: { type: String }, // incident_description varchar(100)
  reportedBy: { type: Number }, // reported_by int(11)
  incidentDate: { type: Date }, // incident_date date
  incidentType: { type: String }, // incident_type varchar(100)
  responsibleperson: { type: Number }, // responsibleperson int(11)
  duedate: { type: Date }, // duedate date
  status: { type: String }, // status varchar(50)
  immediateActions: { type: String }, // immediate_actions varchar(255)
  samplesAffected: { type: String }, // samples_affected varchar(255)
  personnelInvolved: { type: String }, // personnel_involved varchar(50)
  severityLevel: { type: String }, // severity_level varchar(50)
  rootCauseAnalysis: { type: String }, // root_cause_analysis varchar(255)
  correctiveActions: { type: String }, // corrective_actions varchar(255)
  preventiveActions: { type: String }, // preventive_actions varchar(255)
  resolutionDate: { type: Date }, // resolution_date date
  comments: { type: String }, // comments varchar(255)
}, { timestamps: false })

export default mongoose.model('Labincidentreportingprocess', LabincidentreportingprocessSchema, 'labincidentreportingprocess')
