import mongoose from 'mongoose'
const { Schema } = mongoose

const ClinicaltrialsmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  projectId: { type: Number }, // project_id int(11)
  startdate: { type: Date }, // startdate date
  investigator: { type: String }, // investigator varchar(255)
  sitelocation: { type: String }, // sitelocation varchar(255)
  enddate: { type: Date }, // enddate date
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  phase: { type: String }, // phase varchar(255)
}, { timestamps: false })

export default mongoose.model('Clinicaltrialsmanagement', ClinicaltrialsmanagementSchema, 'clinicaltrialsmanagement')
