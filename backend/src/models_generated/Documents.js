import mongoose from 'mongoose'
const { Schema } = mongoose

const DocumentsSchema = new Schema({
  id: { type: Number }, // id int(11)
  uid: { type: Number }, // uid int(11)
  created: { type: Date }, // created datetime
  name: { type: String }, // name varchar(255)
  file: { type: String }, // file varchar(255)
  modified: { type: Date }, // modified datetime
  description: { type: String }, // description text
  docType: { type: String }, // doc_type varchar(25)
  activeDate: { type: Date }, // active_date date
  expDate: { type: Date }, // exp_date date
  categoryId: { type: Number }, // category_id int(11)
  subCategoryId: { type: Number }, // sub_category_id int(11)
  status: { type: String }, // status varchar(255)
  documentRevisionId: { type: Number }, // document_revision_id int(11)
  relatedDocId: { type: Number }, // related_doc_id int(11)
  deleted: { type: Number }, // deleted int(11)
  issuedate: { type: Date }, // issuedate date
  reviseddate: { type: Date }, // reviseddate date
  versionno: { type: String }, // versionno varchar(255)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  approvedby: { type: Number }, // approvedby int(11)
  typeField: { type: String }, // type varchar(100)
  approveddatetime: { type: Date }, // approveddatetime datetime
  uploaddatetime: { type: Date }, // uploaddatetime datetime
  enterdatetime: { type: Date }, // enterdatetime datetime
}, { timestamps: false })

export default mongoose.model('Documents', DocumentsSchema, 'documents')
