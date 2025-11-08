import mongoose from 'mongoose'
const { Schema } = mongoose

const BomitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  bomid: { type: Number }, // bomid int(11)
  mid: { type: String }, // mid varchar(100)
  units: { type: Number }, // units int(11)
  qty: { type: Number }, // qty double
  rate: { type: String }, // rate varchar(100)
  amount: { type: String }, // amount varchar(100)
  actualqty: { type: String }, // actualqty varchar(100)
  grossamount: { type: String }, // grossamount varchar(255)
  actualamount: { type: String }, // actualamount varchar(255)
  purchaserate: { type: String }, // purchaserate varchar(255)
  typeField: { type: String }, // type varchar(25)
  company: { type: Number }, // company int(11)
  description: { type: String }, // description varchar(255)
  designator: { type: String }, // designator text
  remarks: { type: String }, // remarks varchar(255)
  basicqty: { type: Number }, // basicqty double
  basicuom: { type: Number }, // basicuom double
  rep: { type: Number }, // rep float
}, { timestamps: false })

export default mongoose.model('Bomitems', BomitemsSchema, 'bomitems')
