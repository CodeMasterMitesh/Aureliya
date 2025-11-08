import mongoose from 'mongoose'
const { Schema } = mongoose

const ApprovalSchema = new Schema({
  id: { type: Number }, // id int(11)
  typeField: { type: String }, // type varchar(25)
  name: { type: String }, // name varchar(255)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  level1type: { type: String }, // level1type varchar(25)
  level1: { type: String }, // level1 varchar(255)
  level2type: { type: String }, // level2type varchar(25)
  level2: { type: String }, // level2 varchar(255)
  level3type: { type: String }, // level3type varchar(25)
  level3: { type: String }, // level3 varchar(255)
  sid: { type: Number }, // sid int(11)
  sort: { type: Number }, // sort int(11)
  approvallistcode: { type: String }, // approvallistcode varchar(30)
}, { timestamps: false })

export default mongoose.model('Approval', ApprovalSchema, 'approval')
