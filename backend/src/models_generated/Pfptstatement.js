import mongoose from 'mongoose'
const { Schema } = mongoose

const PfptstatementSchema = new Schema({
  id: { type: Number }, // id bigint(20)
  eid: { type: Number }, // eid int(11)
  totalhour: { type: Number }, // totalhour int(11)
  basic: { type: Number }, // basic float
  epf: { type: Number }, // epf float
  grosssalary: { type: Number }, // grosssalary float
  gratuity: { type: Number }, // gratuity float
  pf: { type: Number }, // pf float
  pt: { type: Number }, // pt float
  takehome: { type: Number }, // takehome float
  specialallowance: { type: Number }, // specialallowance float
  netsalary: { type: Number }, // netsalary float
  month: { type: Number }, // month int(11)
  year: { type: Number }, // year int(11)
  salarydate: { type: Date }, // salarydate date
  lastupdateddate: { type: Date }, // lastupdateddate datetime
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
}, { timestamps: false })

export default mongoose.model('Pfptstatement', PfptstatementSchema, 'pfptstatement')
