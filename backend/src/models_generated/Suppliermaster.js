import mongoose from 'mongoose'
const { Schema } = mongoose

const SuppliermasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  address: { type: String }, // address varchar(255)
  city: { type: String }, // city varchar(255)
  state: { type: String }, // state varchar(255)
  country: { type: String }, // country varchar(255)
  pincode: { type: String }, // pincode varchar(255)
  mobile: { type: String }, // mobile varchar(255)
  phone: { type: String }, // phone varchar(255)
  firstname: { type: String }, // firstname varchar(255)
  lastname: { type: String }, // lastname varchar(255)
  birthdate: { type: Date }, // birthdate date
  email: { type: String }, // email varchar(255)
  website: { type: String }, // website varchar(255)
  remark: { type: String }, // remark varchar(255)
  currencyamount: { type: String }, // currencyamount varchar(255)
}, { timestamps: false })

export default mongoose.model('Suppliermaster', SuppliermasterSchema, 'suppliermaster')
