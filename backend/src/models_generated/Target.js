import mongoose from 'mongoose'
const { Schema } = mongoose

const TargetSchema = new Schema({
  id: { type: Number }, // id int(11)
  salesexecutive: { type: Number }, // salesexecutive int(11)
  pid: { type: Number }, // pid int(11)
  qty: { type: Number }, // qty int(11)
  month: { type: Number }, // month int(11)
  year: { type: Number }, // year int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Number }, // modifieddatetime int(11)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  action: { type: String }, // action varchar(50)
  branch: { type: Number }, // branch int(11)
}, { timestamps: false })

export default mongoose.model('Target', TargetSchema, 'target')
