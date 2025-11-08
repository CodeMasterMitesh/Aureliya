import mongoose from 'mongoose'
const { Schema } = mongoose

const FeasibilityassessmentSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  enterdatetime: { type: Date }, // enterdatetime datetime
  description: { type: String }, // description text
  activeDate: { type: Date }, // active_date date
  deleted: { type: Number }, // deleted int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  projectId: { type: Number }, // project_id int(11)
  enterby: { type: Number }, // enterby int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  remarks: { type: String }, // remarks varchar(255)
}, { timestamps: false })

export default mongoose.model('Feasibilityassessment', FeasibilityassessmentSchema, 'feasibilityassessment')
