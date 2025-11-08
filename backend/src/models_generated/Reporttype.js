import mongoose from 'mongoose'
const { Schema } = mongoose

const ReporttypeSchema = new Schema({
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  active: { type: Number }, // active int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  name: { type: String }, // name varchar(100)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  code: { type: String }, // code varchar(50)
  id: { type: Number }, // id int(11)
  remarks: { type: String }, // remarks varchar(255)
}, { timestamps: false })

export default mongoose.model('Reporttype', ReporttypeSchema, 'reporttype')
