import mongoose from 'mongoose'
const { Schema } = mongoose

const OpeningqtyitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  openingqtyid: { type: Number }, // openingqtyid int(11)
  pid: { type: Number }, // pid int(11)
  qty: { type: Number }, // qty decimal(15
  rate: { type: Number }, // rate decimal(15
  amount: { type: Number }, // amount decimal(15
  mfgdate: { type: Date }, // mfgdate date
  expdate: { type: Date }, // expdate date
  batchno: { type: String }, // batchno varchar(50)
  unit: { type: Number }, // unit int(11)
  code: { type: String }, // code varchar(50)
  opdate: { type: Date }, // opdate date
  bexpdate: { type: Date }, // bexpdate date
  bottleopdate: { type: Date }, // bottleopdate date
  bottleexdate: { type: Date }, // bottleexdate date
  location: { type: Number }, // location int(11)
  revision: { type: Number }, // revision int(11)
}, { timestamps: false })

export default mongoose.model('Openingqtyitems', OpeningqtyitemsSchema, 'openingqtyitems')
