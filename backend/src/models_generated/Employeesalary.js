import mongoose from 'mongoose'
const { Schema } = mongoose

const EmployeesalarySchema = new Schema({
  id: { type: Number }, // id int(11)
  totalsalaryyear: { type: Number }, // totalsalaryyear decimal(10
  totalsalarymonth: { type: Number }, // totalsalarymonth decimal(10
  regularHours: { type: Number }, // regular_hours decimal(10
  basicsalarymonth: { type: Number }, // basicsalarymonth decimal(10
  basicsalaryyear: { type: Number }, // basicsalaryyear decimal(10
  hramonth: { type: Number }, // hramonth decimal(10
  hrayear: { type: Number }, // hrayear decimal(10
  medicalyear: { type: Number }, // medicalyear decimal(10
  medicalmonth: { type: Number }, // medicalmonth decimal(10
  travellingmonth: { type: Number }, // travellingmonth decimal(10
  travellingyear: { type: Number }, // travellingyear decimal(10
  specialmonth: { type: Number }, // specialmonth decimal(10
  specialyear: { type: Number }, // specialyear decimal(10
  ptmonth: { type: Number }, // ptmonth decimal(10
  ptyear: { type: Number }, // ptyear decimal(10
  netpayablemonth: { type: Number }, // netpayablemonth decimal(10
  netpayableyear: { type: Number }, // netpayableyear decimal(10
  statutorybonusmonth: { type: Number }, // statutorybonusmonth decimal(10
  statutorybonusyear: { type: Number }, // statutorybonusyear decimal(10
  diwalibonusmonth: { type: Number }, // diwalibonusmonth decimal(10
  diwalibonusyear: { type: Number }, // diwalibonusyear decimal(10
  targetedctc: { type: Number }, // targetedctc decimal(10
  annualcost: { type: Number }, // annualcost decimal(10
  takehome: { type: Number }, // takehome decimal(10
  pfemployeemonth: { type: Number }, // pfemployeemonth decimal(10
  pfemployeeyear: { type: Number }, // pfemployeeyear decimal(10
  pfemployermonth: { type: Number }, // pfemployermonth decimal(10
  pfemployeryear: { type: Number }, // pfemployeryear decimal(10
  esicemployeeyear: { type: Number }, // esicemployeeyear decimal(10
  esicemployeemonth: { type: Number }, // esicemployeemonth decimal(10
  esicemployeryear: { type: Number }, // esicemployeryear decimal(10
  esicemployermonth: { type: Number }, // esicemployermonth decimal(10
  finalsalarymonth: { type: Number }, // finalsalarymonth decimal(10
  finalsalaryyear: { type: Number }, // finalsalaryyear decimal(10
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  date: { type: Date }, // date date
  employeeId: { type: Number }, // employee_id int(11)
  overtimeHours: { type: Number }, // overtime_hours decimal(20
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  targetedctcmonth: { type: Number }, // targetedctcmonth decimal(15
  customvalue: { type: Number }, // customValue decimal(15
  pfcalculate: { type: String }, // pfcalculate varchar(50)
  ptcalculate: { type: String }, // ptcalculate varchar(50)
}, { timestamps: false })

export default mongoose.model('Employeesalary', EmployeesalarySchema, 'employeesalary')
