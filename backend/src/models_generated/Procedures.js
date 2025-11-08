import mongoose from 'mongoose'
const { Schema } = mongoose

const ProceduresSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  price: { type: String }, // price varchar(25)
  parent: { type: Number }, // parent int(11)
  testcode: { type: String }, // testcode varchar(50)
  testcategory: { type: String }, // testcategory varchar(50)
  procedure: { type: String }, // procedure text
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  formulaid: { type: Number }, // formulaid int(11)
  typemasterid: { type: Number }, // typemasterid int(11)
  ip: { type: String }, // ip varchar(50)
  pageno: { type: String }, // pageno varchar(50)
  ipindex: { type: String }, // ipindex varchar(100)
}, { timestamps: false })

export default mongoose.model('Procedures', ProceduresSchema, 'procedures')
