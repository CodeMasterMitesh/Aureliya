import mongoose from 'mongoose'
const { Schema } = mongoose

const EarningsDeductionsSchema = new Schema({
  id: { type: Number }, // id int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  month: { type: Number }, // month int(11)
  remarks: { type: String }, // remarks varchar(255)
  employeeid: { type: Number }, // employeeid int(11)
  headid: { type: Number }, // headid int(11)
  totalnumber: { type: Number }, // totalnumber decimal(15
  unitprice: { type: Number }, // unitprice decimal(15
  amount: { type: Number }, // amount decimal(15
  remarks2: { type: String }, // remarks2 varchar(255)
  year: { type: Number }, // year int(11)
  wlreason: { type: String }, // wlreason varchar(255)
  wlamount: { type: Number }, // wlamount decimal(15
  bankpod: { type: Number }, // bankpod decimal(15
  challanincentive: { type: Number }, // challanincentive decimal(15
  differenceprev: { type: Number }, // differenceprev decimal(15
  extrawork: { type: Number }, // extrawork decimal(15
  otherallowances: { type: Number }, // otherallowances decimal(15
  leavecredit: { type: Number }, // leavecredit decimal(15
  extrapickup: { type: Number }, // extrapickup decimal(15
  eamount: { type: Number }, // eamount decimal(15
  damount: { type: Number }, // damount decimal(15
  edid: { type: Number }, // edid int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  date: { type: Date }, // date date
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
}, { timestamps: false })

export default mongoose.model('EarningsDeductions', EarningsDeductionsSchema, 'earnings_deductions')
