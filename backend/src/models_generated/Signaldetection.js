import mongoose from 'mongoose'
const { Schema } = mongoose

const SignaldetectionSchema = new Schema({
  id: { type: Number }, // id int(11)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  signaldescription: { type: String }, // signaldescription varchar(255)
  datasource: { type: String }, // datasource varchar(100)
  drugId: { type: Number }, // drug_id int(11)
  dateIdentified: { type: Date }, // date_identified date
  actionsTaken: { type: String }, // actions_taken varchar(100)
  evaluationdate: { type: Date }, // evaluationdate date
  evaluationoutcome: { type: String }, // evaluationoutcome varchar(100)
  furtherinvestigationrequired: { type: String }, // furtherinvestigationrequired varchar(50)
  comments: { type: String }, // comments varchar(255)
  branch: { type: Number }, // branch int(11)
}, { timestamps: false })

export default mongoose.model('Signaldetection', SignaldetectionSchema, 'signaldetection')
