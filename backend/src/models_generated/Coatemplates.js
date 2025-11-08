import mongoose from 'mongoose'
const { Schema } = mongoose

const CoatemplatesSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  typeField: { type: String }, // type varchar(50)
  description: { type: String }, // description varchar(100)
  employeeid: { type: Number }, // employeeid int(11)
  date: { type: Date }, // date date
  actionplan: { type: String }, // actionplan varchar(100)
  responsibleperson: { type: Number }, // responsibleperson int(11)
  duedate: { type: Date }, // duedate date
  status: { type: String }, // status varchar(50)
  name: { type: String }, // name varchar(50)
}, { timestamps: false })

export default mongoose.model('Coatemplates', CoatemplatesSchema, 'coatemplates')
