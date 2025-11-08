import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialuseSchema = new Schema({
  id: { type: Number }, // id int(11)
  datetime: { type: Date }, // datetime datetime
  mid: { type: Number }, // mid int(11)
  batchno: { type: String }, // batchno varchar(20)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifyby: { type: Number }, // modifyby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  remarks: { type: String }, // remarks varchar(255)
  qty: { type: Number }, // qty float
  status: { type: String }, // status text
  grade: { type: String }, // grade varchar(25)
  expiredate: { type: Date }, // expiredate date
  packsize: { type: String }, // packsize varchar(25)
  issueto: { type: String }, // issueto varchar(255)
  podate: { type: Date }, // podate datetime
  salsrno: { type: String }, // salsrno varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Materialuse', MaterialuseSchema, 'materialuse')
