import mongoose from 'mongoose'
const { Schema } = mongoose

const NotesSchema = new Schema({
  assignedUserId: { type: String }, // assigned_user_id char(36)
  id: { type: String }, // id char(36)
  dateEntered: { type: Date }, // date_entered datetime
  dateModified: { type: Date }, // date_modified datetime
  modifiedUserId: { type: String }, // modified_user_id char(36)
  createdBy: { type: String }, // created_by char(36)
  name: { type: String }, // name varchar(255)
  fileMimeType: { type: String }, // file_mime_type varchar(100)
  filename: { type: String }, // filename varchar(255)
  parentType: { type: String }, // parent_type varchar(255)
  parentId: { type: String }, // parent_id char(36)
  contactId: { type: String }, // contact_id char(36)
  portalFlag: { type: Boolean }, // portal_flag tinyint(1)
  embedFlag: { type: Boolean }, // embed_flag tinyint(1)
  description: { type: String }, // description text
  deleted: { type: Boolean }, // deleted tinyint(1)
}, { timestamps: false })

export default mongoose.model('Notes', NotesSchema, 'notes')
