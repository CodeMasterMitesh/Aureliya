import mongoose from 'mongoose'
const { Schema } = mongoose

const BankmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  branchname: { type: String }, // branchname varchar(255)
  customerid: { type: Number }, // customerid int(11)
  accountno: { type: String }, // accountno varchar(255)
  micrcode: { type: String }, // micrcode varchar(255)
  ifsccode: { type: String }, // ifsccode varchar(255)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Bankmaster', BankmasterSchema, 'bankmaster')
