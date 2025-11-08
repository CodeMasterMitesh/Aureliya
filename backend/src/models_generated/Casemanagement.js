import mongoose from 'mongoose'
const { Schema } = mongoose

const CasemanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  dateOfReport: { type: Date }, // date_of_report date
  reporterName: { type: String }, // reporter_name varchar(100)
  reporterContactInfo: { type: String }, // reporter_contact_info varchar(255)
  patientName: { type: String }, // patient_name varchar(100)
  patientAge: { type: Number }, // patient_age int(11)
  patientGender: { type: String }, // patient_gender enum('male'
  adverseEventDescription: { type: String }, // adverse_event_description text
  dateOfAdverseEvent: { type: Date }, // date_of_adverse_event date
  suspectedDrugs: { type: String }, // suspected_drugs text
  concomitantDrugs: { type: String }, // concomitant_drugs text
  medicalHistory: { type: String }, // medical_history text
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Casemanagement', CasemanagementSchema, 'casemanagement')
