import mongoose from 'mongoose'
const { Schema } = mongoose

const CompanyBranchSchema = new Schema({
  id: { type: Number }, // id int(11)
  cid: { type: Number }, // cid int(11)
  name: { type: String }, // name varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('CompanyBranch', CompanyBranchSchema, 'company_branch')
