import mongoose from 'mongoose'
const { Schema } = mongoose

const FranchiseSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  address: { type: String }, // address varchar(255)
  mobile: { type: String }, // mobile varchar(255)
  phone: { type: String }, // phone varchar(255)
  fax: { type: String }, // fax varchar(255)
  email: { type: String }, // email varchar(255)
  city: { type: String }, // city varchar(255)
  cpname: { type: String }, // cpname varchar(255)
  remarks: { type: String }, // remarks text
  startdate: { type: Date }, // startdate date
  registrationfee: { type: String }, // registrationfee varchar(255)
  depositfee: { type: String }, // depositfee varchar(255)
  bankname: { type: String }, // bankname varchar(255)
  branchname: { type: String }, // branchname varchar(255)
}, { timestamps: false })

export default mongoose.model('Franchise', FranchiseSchema, 'franchise')
