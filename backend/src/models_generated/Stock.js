import mongoose from 'mongoose'
const { Schema } = mongoose

const StockSchema = new Schema({
  id: { type: Number }, // id int(11)
  typeField: { type: String }, // type varchar(150)
  refid: { type: Number }, // refid int(11)
  refitemid: { type: Number }, // refitemid int(11)
  project: { type: Number }, // project int(11)
  pid: { type: Number }, // pid int(11)
  tablename: { type: String }, // tablename varchar(50)
  qty: { type: Number }, // qty decimal(20
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  plus: { type: Number }, // plus decimal(20
  minus: { type: Number }, // minus decimal(20
  location: { type: Number }, // location int(11)
  rate: { type: Number }, // rate decimal(20
  amount: { type: Number }, // amount decimal(20
  srno: { type: String }, // srno varchar(50)
  godown: { type: Number }, // godown int(11)
  datetime: { type: Date }, // datetime datetime
  branch: { type: Number }, // branch int(11)
  effectiverate: { type: Number }, // effectiverate decimal(20
  effectiveamount: { type: Number }, // effectiveamount decimal(20
  discount: { type: Number }, // discount decimal(10
  sort: { type: Number }, // sort int(11)
  expdate: { type: Date }, // expdate date
  mfgdate: { type: Date }, // mfgdate date
  adminrate: { type: Number }, // adminrate int(11)
  type1: { type: String }, // type1 varchar(50)
  demo: { type: Number }, // demo int(11)
  btob: { type: Number }, // btob int(11)
  revision: { type: Number }, // revision int(11)
  salsrno: { type: Number }, // salsrno int(11)
  casnumber: { type: String }, // casnumber varchar(100)
  name: { type: String }, // name varchar(100)
  code: { type: String }, // code varchar(50)
  purchaserate: { type: Number }, // purchaserate float
  supplierid: { type: Number }, // supplierid int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
  make: { type: String }, // make varchar(50)
  open: { type: String }, // open varchar(50)
  packsize: { type: Number }, // packsize int(11)
  date: { type: Date }, // date date
  refparentid: { type: Number }, // refparentid int(11)
  expiredate: { type: Date }, // expiredate date
  table: { type: String }, // table varchar(50)
}, { timestamps: false })

export default mongoose.model('Stock', StockSchema, 'stock')
