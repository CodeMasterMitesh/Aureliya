import mongoose from 'mongoose'
const { Schema } = mongoose

const BudgetmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  name: { type: String }, // name varchar(255)
  typeField: { type: String }, // type varchar(255)
  modelno: { type: String }, // modelno varchar(50)
  podate: { type: Date }, // podate date
  porate: { type: String }, // porate varchar(255)
  vendor: { type: String }, // vendor varchar(255)
  servicedate: { type: Date }, // servicedate date
  servicetime: { type: String }, // servicetime time
  materialname: { type: String }, // materialname varchar(255)
  qty: { type: Number }, // qty int(11)
  date: { type: Date }, // date date
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Budgetmaster', BudgetmasterSchema, 'budgetmaster')
