import mongoose from 'mongoose'
const { Schema } = mongoose

const OpeningbalanceitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  openingbalanceid: { type: Number }, // openingbalanceid int(11)
  ledgerid: { type: Number }, // ledgerid int(11)
  billno: { type: String }, // billno varchar(50)
  crdr: { type: String }, // crdr varchar(11)
  date: { type: Date }, // date date
  amount: { type: String }, // amount varchar(255)
  total: { type: String }, // total varchar(255)
  typeField: { type: String }, // type varchar(11)
  category: { type: String }, // category varchar(50)
  subcategory: { type: String }, // subcategory varchar(25)
  barcode: { type: String }, // barcode varchar(255)
  typename: { type: String }, // typename varchar(255)
  gross: { type: Number }, // gross double
  netamount: { type: String }, // netamount varchar(25)
  srno: { type: String }, // srno varchar(25)
  invoiceno: { type: String }, // invoiceno varchar(255)
  total1: { type: Number }, // total1 float
  total2: { type: Number }, // total2 float
  duty: { type: Number }, // duty float
  totalcost: { type: Number }, // totalcost float
  description: { type: String }, // description varchar(255)
  remarks: { type: String }, // remarks varchar(50)
  purchasedate: { type: Date }, // purchasedate date
  productid: { type: Number }, // productid int(11)
  categoryid: { type: Number }, // categoryid int(11)
}, { timestamps: false })

export default mongoose.model('Openingbalanceitems', OpeningbalanceitemsSchema, 'openingbalanceitems')
