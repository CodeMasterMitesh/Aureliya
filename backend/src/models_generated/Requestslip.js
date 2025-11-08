import mongoose from 'mongoose'
const { Schema } = mongoose

const RequestslipSchema = new Schema({
  id: { type: Number }, // id int(11)
  clientid: { type: Number }, // clientid int(11)
  date: { type: Date }, // date date
  enterby: { type: Number }, // enterby int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
}, { timestamps: false })

export default mongoose.model('Requestslip', RequestslipSchema, 'requestslip')
