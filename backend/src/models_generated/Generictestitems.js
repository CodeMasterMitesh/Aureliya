import mongoose from 'mongoose'
const { Schema } = mongoose

const GenerictestitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  generictestid: { type: Number }, // generictestid int(11)
  testname: { type: String }, // testname varchar(50)
  testid: { type: Number }, // testid int(11)
  bypass: { type: String }, // bypass varchar(50)
  parent: { type: String }, // parent varchar(50)
  parametername: { type: String }, // parametername varchar(50)
  units: { type: String }, // units varchar(50)
  noofstandard: { type: String }, // noofstandard tinytext
  nooftest: { type: String }, // nooftest tinytext
  impurities: { type: String }, // impurities tinytext
  drugname: { type: String }, // drugname tinytext
  minlimit: { type: String }, // minlimit varchar(50)
  maxlimit: { type: String }, // maxlimit varchar(50)
  description: { type: String }, // description varchar(255)
  amount: { type: Number }, // amount decimal(15
  nabl: { type: String }, // nabl varchar(20)
  testtypeid: { type: Number }, // testtypeid int(11)
}, { timestamps: false })

export default mongoose.model('Generictestitems', GenerictestitemsSchema, 'generictestitems')
