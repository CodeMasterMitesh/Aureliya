import mongoose from 'mongoose'
const { Schema } = mongoose

const InstrumentitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  instrumentid: { type: Number }, // instrumentid int(11)
  pid: { type: String }, // pid varchar(255)
  qty: { type: String }, // qty varchar(255)
  rate: { type: String }, // rate varchar(255)
  taxrate: { type: String }, // taxrate varchar(255)
  discount: { type: Number }, // discount float
  amount: { type: Number }, // amount float
  mrp: { type: Number }, // mrp float
  weight: { type: String }, // weight varchar(255)
  miscdiscount: { type: String }, // miscdiscount varchar(255)
  total: { type: Number }, // total float
  typeField: { type: String }, // type varchar(11)
  category: { type: String }, // category varchar(50)
  machinefolder: { type: String }, // machinefolder varchar(255)
  mid: { type: Number }, // mid int(11)
  partno: { type: String }, // partno varchar(255)
  follow: { type: String }, // follow varchar(255)
  method: { type: String }, // method varchar(255)
}, { timestamps: false })

export default mongoose.model('Instrumentitems', InstrumentitemsSchema, 'instrumentitems')
