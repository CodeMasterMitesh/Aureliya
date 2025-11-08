import mongoose from 'mongoose'
const { Schema } = mongoose

const ExperimentmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  experimentdesign: { type: String }, // experimentdesign varchar(255)
  startdate: { type: Date }, // startdate date
  investigator: { type: String }, // investigator varchar(255)
  sitelocation: { type: String }, // sitelocation varchar(255)
  enddate: { type: Date }, // enddate date
  objective: { type: String }, // objective varchar(255)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  phase: { type: String }, // phase varchar(255)
  projectId: { type: Number }, // project_id int(11)
  hypothesis: { type: String }, // hypothesis varchar(255)
  methodology: { type: String }, // methodology varchar(255)
  variables: { type: String }, // variables varchar(255)
  controls: { type: String }, // controls varchar(255)
}, { timestamps: false })

export default mongoose.model('Experimentmanagement', ExperimentmanagementSchema, 'experimentmanagement')
