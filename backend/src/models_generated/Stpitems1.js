import mongoose from 'mongoose'
const { Schema } = mongoose

const Stpitems1Schema = new Schema({
  id: { type: Number }, // id int(11)
  parent: { type: String }, // parent varchar(11)
  stpid: { type: Number }, // stpid int(11)
  parametername: { type: String }, // parametername varchar(255)
  description: { type: String }, // description varchar(255)
  division: { type: String }, // division varchar(25)
  nabl: { type: String }, // nabl varchar(25)
  units: { type: String }, // units varchar(25)
  method: { type: String }, // method varchar(255)
  minlimit: { type: String }, // minlimit text
  maxlimit: { type: String }, // maxlimit text
  formula: { type: String }, // formula varchar(25)
  logic: { type: String }, // logic varchar(25)
  minqty: { type: String }, // minqty varchar(25)
  labelclaim: { type: String }, // labelclaim varchar(200)
  peroflabelclaim: { type: Number }, // peroflabelclaim float
  limit: { type: String }, // limit varchar(255)
  result: { type: String }, // result varchar(255)
  testtime: { type: String }, // testtime varchar(255)
  pid: { type: Number }, // pid int(11)
  amount: { type: String }, // amount varchar(25)
  bypass: { type: String }, // bypass varchar(255)
  testid: { type: Number }, // testid int(11)
  testtypeid: { type: Number }, // testtypeid int(11)
  noofstandard: { type: String }, // noofstandard longtext
  nooftest: { type: String }, // nooftest longtext
  impurities: { type: String }, // impurities longtext
  drugname: { type: String }, // drugname longtext
  psrno: { type: Number }, // psrno int(11)
  parentChild: { type: Number }, // parent_child float
  typemasterid: { type: Number }, // typemasterid int(11)
  drugminlimit2: { type: String }, // drugminlimit2 varchar(255)
  drugmaxlimit2: { type: String }, // drugmaxlimit2 varchar(255)
  impurityminlimit2: { type: String }, // impurityminlimit2 varchar(255)
  impuritymaxlimit2: { type: String }, // impuritymaxlimit2 varchar(255)
  departmentid: { type: Number }, // departmentid int(11)
  instrumenttype: { type: Number }, // instrumenttype int(11)
  testdays: { type: Number }, // testdays int(11)
}, { timestamps: false })

export default mongoose.model('Stpitems1', Stpitems1Schema, 'stpitems1')
