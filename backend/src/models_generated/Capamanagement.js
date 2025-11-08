import mongoose from 'mongoose'
const { Schema } = mongoose

const CapamanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  title: { type: String }, // title varchar(150)
  typeField: { type: String }, // type varchar(150)
  event: { type: String }, // event varchar(150)
  employeeid: { type: Number }, // employeeid int(11)
  date: { type: Date }, // date date
  actualdate: { type: Date }, // actualdate date
  review: { type: String }, // review varchar(255)
  closuredate: { type: Date }, // closuredate date
}, { timestamps: false })

export default mongoose.model('Capamanagement', CapamanagementSchema, 'capamanagement')
