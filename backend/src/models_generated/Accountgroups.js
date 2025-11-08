import mongoose from 'mongoose'
const { Schema } = mongoose

const AccountgroupsSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  parentgroup: { type: String }, // parentgroup varchar(255)
  code: { type: String }, // code varchar(6)
  typeField: { type: String }, // type varchar(25)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  type2: { type: String }, // type2 varchar(50)
  guid: { type: String }, // guid varchar(50)
}, { timestamps: false })

export default mongoose.model('Accountgroups', AccountgroupsSchema, 'accountgroups')
