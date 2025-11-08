import mongoose from 'mongoose'
const { Schema } = mongoose

const ProjectSchema = new Schema({
  id: { type: String }, // id char(36)
  dateEntered: { type: Date }, // date_entered datetime
  dateModified: { type: Date }, // date_modified datetime
  assignedUserId: { type: String }, // assigned_user_id char(36)
  modifiedUserId: { type: String }, // modified_user_id char(36)
  createdBy: { type: String }, // created_by char(36)
  name: { type: String }, // name varchar(50)
  description: { type: String }, // description text
  deleted: { type: Boolean }, // deleted tinyint(1)
  estimatedStartDate: { type: Date }, // estimated_start_date date
  estimatedEndDate: { type: Date }, // estimated_end_date date
  status: { type: String }, // status varchar(255)
  priority: { type: String }, // priority varchar(255)
}, { timestamps: false })

export default mongoose.model('Project', ProjectSchema, 'project')
