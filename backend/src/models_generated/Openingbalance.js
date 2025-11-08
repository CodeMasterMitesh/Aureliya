import mongoose from 'mongoose'
const { Schema } = mongoose

const OpeningbalanceSchema = new Schema({
  id: { type: Number }, // id int(11)
  date: { type: Date }, // date date
  remark: { type: String }, // remark varchar(255)
  total: { type: String }, // total varchar(25)
  branch: { type: Number }, // branch int(11)
  company: { type: String }, // company varchar(255)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  action: { type: String }, // action varchar(25)
  approved: { type: String }, // approved varchar(25)
  typeField: { type: String }, // type varchar(50)
}, { timestamps: false })

export default mongoose.model('Openingbalance', OpeningbalanceSchema, 'openingbalance')
