import mongoose from 'mongoose'
const { Schema } = mongoose

const ChangecontrolSchema = new Schema({
  id: { type: Number }, // id int(11)
  justification: { type: String }, // justification varchar(255)
  implementation: { type: String }, // implementation varchar(255)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  typeField: { type: String }, // type varchar(255)
  description: { type: String }, // description varchar(25)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  closuredate: { type: Date }, // closuredate date
  employeeid: { type: Number }, // employeeid int(11)
  results: { type: String }, // results varchar(50)
}, { timestamps: false })

export default mongoose.model('Changecontrol', ChangecontrolSchema, 'changecontrol')
