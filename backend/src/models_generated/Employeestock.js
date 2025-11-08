import mongoose from 'mongoose'
const { Schema } = mongoose

const EmployeestockSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  tablename: { type: String }, // tablename varchar(50)
  qty: { type: Number }, // qty float
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  typeField: { type: String }, // type varchar(150)
  plus: { type: Number }, // plus float
  minus: { type: Number }, // minus float
  rate: { type: Number }, // rate float
  amount: { type: Number }, // amount float
  refid: { type: Number }, // refid int(11)
  refitemid: { type: Number }, // refitemid int(11)
  srno: { type: String }, // srno varchar(50)
  employeeid: { type: Number }, // employeeid int(11)
  datetime: { type: Date }, // datetime datetime
  branch: { type: Number }, // branch int(11)
  godown: { type: Number }, // godown int(11)
  location: { type: Number }, // location int(11)
  sort: { type: Number }, // sort int(11)
  effectiverate: { type: Number }, // effectiverate decimal(20
  effectiveamount: { type: Number }, // effectiveamount decimal(20
  type1: { type: String }, // type1 varchar(50)
}, { timestamps: false })

export default mongoose.model('Employeestock', EmployeestockSchema, 'employeestock')
