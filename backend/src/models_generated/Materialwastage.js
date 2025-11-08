import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialwastageSchema = new Schema({
  id: { type: Number }, // id int(11)
  date: { type: Date }, // date datetime
  karigar: { type: Number }, // karigar int(11)
  machine: { type: Number }, // machine int(11)
  department: { type: Number }, // department int(11)
  branch: { type: String }, // branch varchar(255)
  company: { type: String }, // company varchar(255)
  uid: { type: Number }, // uid int(11)
  total: { type: Number }, // total float
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modifiedby: { type: String }, // modifiedby varchar(100)
  enterby: { type: String }, // enterby varchar(100)
  enterdatetime: { type: Date }, // enterdatetime datetime
  godown: { type: Number }, // godown int(11)
  remarks: { type: String }, // remarks varchar(255)
  remraks: { type: String }, // remraks text
  approved: { type: String }, // approved varchar(15)
  approvedby: { type: Number }, // approvedby int(11)
}, { timestamps: false })

export default mongoose.model('Materialwastage', MaterialwastageSchema, 'materialwastage')
