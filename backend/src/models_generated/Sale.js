import mongoose from 'mongoose'
const { Schema } = mongoose

const SaleSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  casnumber: { type: String }, // casnumber varchar(50)
  name: { type: String }, // name varchar(50)
  salsrno: { type: String }, // salsrno varchar(50)
  code: { type: String }, // code varchar(50)
  qty: { type: Number }, // qty decimal(15
  purchaserate: { type: Number }, // purchaserate decimal(15
  supplierid: { type: Number }, // supplierid int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  make: { type: String }, // make varchar(50)
  open: { type: String }, // open varchar(50)
  packsize: { type: String }, // packsize varchar(50)
  typeField: { type: String }, // type varchar(150)
  date: { type: Date }, // date date
  refparentid: { type: Number }, // refparentid int(11)
  refitemid: { type: Number }, // refitemid int(11)
  expiredate: { type: Date }, // expiredate date
  table: { type: String }, // table varchar(100)
  godown: { type: Number }, // godown int(11)
}, { timestamps: false })

export default mongoose.model('Sale', SaleSchema, 'sale')
