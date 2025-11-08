import mongoose from 'mongoose'
const { Schema } = mongoose

const SalaryregisterSchema = new Schema({
  id: { type: Number }, // id bigint(20)
  eid: { type: Number }, // eid int(11)
  totalhour: { type: Number }, // totalhour int(11)
  salary: { type: Number }, // salary float
  perhrsalary: { type: Number }, // perhrsalary float
  grosssalary: { type: Number }, // grosssalary float
  othr: { type: Number }, // othr float
  otsalary: { type: Number }, // otsalary float
  deductions: { type: Number }, // deductions float
  tds: { type: Number }, // tds float
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
  basicR: { type: Number }, // basic_r float
  basic: { type: Number }, // basic float
  childeducation: { type: Number }, // childeducation float
  childeducationR: { type: Number }, // childeducation_r float
  da: { type: Number }, // da float
  daR: { type: Number }, // da_r float
  hra: { type: Number }, // hra float
  hraR: { type: Number }, // hra_r float
  foodR: { type: Number }, // food_r float
  medicalR: { type: Number }, // medical_r float
  medical: { type: Number }, // medical float
  food: { type: Number }, // food float
  otherR: { type: Number }, // other_r float
  other: { type: Number }, // other float
  personalpersuit: { type: Number }, // personalpersuit float
  bonusR: { type: Number }, // bonus_r float
  eduallow: { type: Number }, // eduallow float
  eduallowA: { type: Number }, // eduallow_a float
  convR: { type: Number }, // conv_r float
  conv: { type: Number }, // conv float
  convA: { type: Number }, // conv_a float
  ot: { type: Number }, // ot float
  pt: { type: Number }, // pt float
  pf: { type: Number }, // pf float
  incometax: { type: Number }, // incometax float
  advance: { type: Number }, // advance float
  esicyesno: { type: String }, // esicyesno varchar(15)
  esic: { type: Number }, // esic float
  ptyesno: { type: String }, // ptyesno varchar(15)
  pfyesno: { type: String }, // pfyesno varchar(15)
  daysworked: { type: Number }, // daysworked float
  extradays: { type: Number }, // extradays float
  totaldays: { type: Number }, // totaldays float
  totalholiday: { type: Number }, // totalholiday float
  weekoff: { type: Number }, // weekoff float
  lwp: { type: Number }, // lwp float
  el: { type: Number }, // el float
  sl: { type: Number }, // sl float
  pl: { type: Number }, // pl float
  cl: { type: Number }, // cl float
  dayspaid: { type: Number }, // dayspaid float
  specialR: { type: Number }, // special_r float
  special: { type: Number }, // special float
  personalpersuitR: { type: Number }, // personalpersuit_r float
  bonus: { type: Number }, // bonus float
  lwf: { type: Number }, // lwf float
  grossRate: { type: Number }, // gross_rate float
  expense: { type: Number }, // expense float
}, { timestamps: false })

export default mongoose.model('Salaryregister', SalaryregisterSchema, 'salaryregister')
