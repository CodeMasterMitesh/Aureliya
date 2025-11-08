import mongoose from 'mongoose'
const { Schema } = mongoose

const OutstandingSchema = new Schema({
  id: { type: Number }, // id bigint(20)
  billno: { type: String }, // billno varchar(50)
  billdate: { type: Date }, // billdate datetime
  ledgername: { type: String }, // ledgername varchar(200)
  ledgerid: { type: Number }, // ledgerid int(11)
  amount: { type: Number }, // amount decimal(12
  oldamount: { type: Number }, // oldamount decimal(15
  typeField: { type: String }, // type varchar(25)
  salesid: { type: Number }, // salesid int(11)
  table: { type: String }, // table varchar(100)
  voucheritemsid: { type: Number }, // voucheritemsid int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  billtotal: { type: Number }, // billtotal decimal(12
  tallyrefno: { type: String }, // tallyrefno varchar(100)
  groupId: { type: Number }, // group_id int(11)
  duedate: { type: Date }, // duedate date
  remarks: { type: String }, // remarks text
  salesperson: { type: Number }, // salesperson int(11)
  rgon: { type: Number }, // rgon int(11)
  subrgon: { type: Number }, // subrgon int(11)
  maincatid: { type: String }, // maincatid varchar(150)
  mainproductid: { type: String }, // mainproductid varchar(150)
  maincategory: { type: String }, // maincategory text
  mainproduct: { type: String }, // mainproduct text
  credit: { type: Number }, // credit decimal(15
  debit: { type: Number }, // debit decimal(15
  mainid: { type: Number }, // mainid int(11)
  maintable: { type: String }, // maintable varchar(50)
  itemid: { type: Number }, // itemid int(11)
  itemtable: { type: String }, // itemtable varchar(50)
  receipttotal: { type: Number }, // receipttotal decimal(15
  duetotal: { type: Number }, // duetotal decimal(15
  agingdays: { type: Number }, // agingdays int(11)
}, { timestamps: false })

export default mongoose.model('Outstanding', OutstandingSchema, 'outstanding')
