import mongoose from 'mongoose'
const { Schema } = mongoose

const ResourcesSchema = new Schema({
  id: { type: Number }, // id int(11)
  departmentid: { type: Number }, // departmentid int(11)
  parentId: { type: Number }, // parent_id int(11)
  firstname: { type: String }, // firstname varchar(30)
  middlename: { type: String }, // middlename varchar(255)
  lastname: { type: String }, // lastname varchar(30)
  email: { type: String }, // email varchar(30)
  username: { type: String }, // username varchar(20)
  password: { type: String }, // password varchar(30)
  position: { type: String }, // position varchar(20)
  phone: { type: String }, // phone varchar(15)
  mobile: { type: String }, // mobile varchar(15)
  address: { type: String }, // address varchar(255)
  area: { type: String }, // area varchar(30)
  city: { type: String }, // city varchar(30)
  state: { type: String }, // state varchar(255)
  country: { type: String }, // country varchar(255)
  emergencycontactname: { type: String }, // emergencycontactname varchar(30)
  emergencycontactno: { type: String }, // emergencycontactno varchar(15)
  parent: { type: String }, // parent varchar(10)
  bloodgroup: { type: String }, // bloodgroup varchar(10)
  birthdate: { type: Date }, // birthdate date
  gender: { type: String }, // gender varchar(5)
  married: { type: String }, // married varchar(10)
  photo: { type: String }, // photo varchar(255)
  joindate: { type: Date }, // joindate date
  biodata: { type: String }, // biodata text
  pancardno: { type: String }, // pancardno varchar(255)
  passportno: { type: String }, // passportno varchar(255)
  drivingliecenseno: { type: String }, // drivingliecenseno varchar(255)
  pancardscancopy: { type: String }, // pancardscancopy varchar(255)
  passportscancopy: { type: String }, // passportscancopy varchar(255)
  drivingliecensecopy: { type: String }, // drivingliecensecopy varchar(255)
  account: { type: Number }, // account int(11)
}, { timestamps: false })

export default mongoose.model('Resources', ResourcesSchema, 'resources')
