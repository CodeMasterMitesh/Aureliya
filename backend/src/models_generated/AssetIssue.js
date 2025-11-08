import mongoose from 'mongoose'
const { Schema } = mongoose

const AssetIssueSchema = new Schema({
  id: { type: Number }, // id bigint(20)
  code: { type: String }, // code varchar(255)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  deleteField: { type: Boolean }, // delete tinyint(1)
  active: { type: Boolean }, // active tinyint(1)
  sort: { type: Number }, // sort int(11)
  assetId: { type: Number }, // asset_id int(11)
  condition: { type: String }, // condition text
  employeeId: { type: String }, // employee_id text
  issuedate: { type: Date }, // issuedate datetime
  remarks: { type: String }, // remarks text
  attachment1: { type: Buffer }, // attachment1 longblob
  attachment2: { type: Buffer }, // attachment2 longblob
  attachment3: { type: Buffer }, // attachment3 longblob
  attachment4: { type: Buffer }, // attachment4 longblob
}, { timestamps: false })

export default mongoose.model('AssetIssue', AssetIssueSchema, 'asset_issue')
