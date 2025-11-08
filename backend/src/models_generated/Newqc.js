import mongoose from 'mongoose'
const { Schema } = mongoose

const NewqcSchema = new Schema({
  id: { type: Number }, // id int(11)
  qcnumber: { type: Number }, // qcnumber int(11)
  grnnumber: { type: Number }, // grnnumber int(11)
  supplier: { type: Number }, // supplier int(11)
  suppliermobile: { type: String }, // suppliermobile varchar(255)
  supplieremail: { type: String }, // supplieremail varchar(255)
  area: { type: String }, // area varchar(255)
  qcby: { type: Number }, // qcby int(11)
  date: { type: Date }, // date datetime
  remark: { type: String }, // remark text
  typeField: { type: String }, // type varchar(255)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  action: { type: String }, // action varchar(25)
  frombranch: { type: Number }, // frombranch int(11)
  location: { type: Number }, // location int(11)
  grnno: { type: Number }, // grnno int(11)
  approved: { type: String }, // approved varchar(10)
}, { timestamps: false })

export default mongoose.model('Newqc', NewqcSchema, 'newqc')
