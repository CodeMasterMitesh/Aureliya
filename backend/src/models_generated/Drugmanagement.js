import mongoose from 'mongoose'
const { Schema } = mongoose

const DrugmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  name: { type: String }, // name varchar(100)
  therapeuticClass: { type: String }, // therapeutic_class varchar(100)
  supplierid: { type: Number }, // supplierid int(11)
  dosageform: { type: String }, // dosageform varchar(255)
  unit: { type: Number }, // unit int(11)
  status: { type: String }, // status varchar(100)
  approvalDate: { type: Date }, // approval_date date
  strength: { type: String }, // strength varchar(100)
  quantity: { type: Number }, // quantity decimal(15
}, { timestamps: false })

export default mongoose.model('Drugmanagement', DrugmanagementSchema, 'drugmanagement')
