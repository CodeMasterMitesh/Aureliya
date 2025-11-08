import mongoose from 'mongoose'
const { Schema } = mongoose

const EarningsDeductionsHeadSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  date: { type: Date }, // date date
  plus: { type: Number }, // plus decimal(15
  minus: { type: Number }, // minus decimal(15
  details: { type: String }, // details varchar(255)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  typeField: { type: String }, // type varchar(255)
  name: { type: String }, // name varchar(255)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('EarningsDeductionsHead', EarningsDeductionsHeadSchema, 'earnings_deductions_head')
