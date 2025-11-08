import mongoose from 'mongoose'
const { Schema } = mongoose

const CustomeramcitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  customeramcId: { type: Number }, // customeramc_id int(11)
  days: { type: String }, // days text
  remarks: { type: String }, // remarks text
  amcNo: { type: Number }, // amc_no int(11)
  date: { type: Date }, // date date
  status: { type: String }, // status varchar(20)
  assignto: { type: Number }, // assignto int(11)
  attechment1: { type: String }, // attechment1 varchar(255)
  attechment2: { type: String }, // attechment2 varchar(255)
}, { timestamps: false })

export default mongoose.model('Customeramcitems', CustomeramcitemsSchema, 'customeramcitems')
