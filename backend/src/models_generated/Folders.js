import mongoose from 'mongoose'
const { Schema } = mongoose

const FoldersSchema = new Schema({
  id: { type: String }, // id char(36)
  name: { type: String }, // name varchar(25)
  folderType: { type: String }, // folder_type varchar(25)
  parentFolder: { type: String }, // parent_folder char(36)
  hasChild: { type: Boolean }, // has_child tinyint(1)
  isGroup: { type: Boolean }, // is_group tinyint(1)
  isDynamic: { type: Boolean }, // is_dynamic tinyint(1)
  dynamicQuery: { type: String }, // dynamic_query text
  assignToId: { type: String }, // assign_to_id char(36)
  createdBy: { type: String }, // created_by char(36)
  modifiedBy: { type: String }, // modified_by char(36)
  deleted: { type: Boolean }, // deleted tinyint(1)
}, { timestamps: false })

export default mongoose.model('Folders', FoldersSchema, 'folders')
