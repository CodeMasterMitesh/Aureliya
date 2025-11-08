import mongoose from 'mongoose'
const { Schema } = mongoose

const RegulatoryapprovalSchema = new Schema({
  id: { type: Number }, // id int(11)
  projectId: { type: Number }, // project_id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  authoId: { type: Number }, // autho_id int(11)
  approvaldate: { type: Date }, // approvaldate date
  status: { type: String }, // status varchar(100)
  country: { type: String }, // country varchar(100)
  dosageform: { type: String }, // dosageform varchar(100)
  strength: { type: String }, // strength varchar(100)
  storage: { type: String }, // storage varchar(100)
  shelflife: { type: String }, // shelflife varchar(100)
  labeling: { type: String }, // labeling varchar(100)
  clinicaltrial: { type: String }, // clinicaltrial varchar(100)
  reviewercomments: { type: String }, // reviewercomments varchar(100)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  bomId: { type: Number }, // bom_id int(11)
}, { timestamps: false })

export default mongoose.model('Regulatoryapproval', RegulatoryapprovalSchema, 'regulatoryapproval')
