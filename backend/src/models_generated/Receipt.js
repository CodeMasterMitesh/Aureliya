import mongoose from 'mongoose'
const { Schema } = mongoose

const ReceiptSchema = new Schema({
  id: { type: Number }, // id int(11)
  client: { type: Number }, // client int(11)
  date: { type: Date }, // date date
  remark: { type: String }, // remark varchar(255)
  total: { type: Number }, // total double
  tdsAmount: { type: String }, // tds_amount varchar(255)
  adjustment: { type: String }, // adjustment varchar(255)
  paymenttype: { type: String }, // paymenttype varchar(255)
  bankname: { type: String }, // bankname varchar(255)
  branchname: { type: String }, // branchname varchar(255)
  chequeno: { type: String }, // chequeno varchar(255)
  chequedate: { type: Date }, // chequedate date
  company: { type: Number }, // company int(11)
  receiptorderdate: { type: Date }, // receiptorderdate datetime
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  vouchertype: { type: String }, // vouchertype varchar(100)
  godown: { type: Number }, // godown int(11)
  salechallanid: { type: Number }, // salechallanid int(11)
  receiptno: { type: String }, // receiptno varchar(100)
  bankcash: { type: String }, // bankcash varchar(50)
  ledgerid: { type: Number }, // ledgerid int(11)
  approved: { type: String }, // approved varchar(20)
  chequeatt: { type: String }, // chequeatt varchar(255)
  att1: { type: String }, // att1 varchar(255)
  att2: { type: String }, // att2 varchar(255)
  att3: { type: String }, // att3 varchar(255)
  att4: { type: String }, // att4 varchar(255)
  cleardate: { type: Date }, // cleardate date
  chequename: { type: String }, // chequename varchar(50)
  tally: { type: Number }, // tally int(11)
  utrno: { type: String }, // utrno varchar(50)
  voucherno: { type: String }, // voucherno varchar(100)
  voucherid: { type: Number }, // voucherid int(11)
  advance: { type: Number }, // advance decimal(15
  forexrate: { type: Number }, // forexrate decimal(15
  groupId: { type: Number }, // group_id int(11)
  salesperson: { type: Number }, // salesperson int(11)
  rgon: { type: Number }, // rgon int(11)
  subrgon: { type: Number }, // subrgon int(11)
  maincatid: { type: String }, // maincatid varchar(150)
  mainproductid: { type: String }, // mainproductid varchar(150)
  maincategory: { type: String }, // maincategory text
  mainproduct: { type: String }, // mainproduct text
  costid: { type: Number }, // costid int(11)
  headquarter: { type: Number }, // headquarter int(11)
  auditremarks: { type: String }, // auditremarks varchar(255)
  sms: { type: String }, // sms varchar(50)
  typeField: { type: String }, // type varchar(50)
  guid: { type: String }, // guid varchar(100)
  type2: { type: String }, // type2 varchar(50)
  tdsledger: { type: Number }, // tdsledger int(11)
}, { timestamps: false })

export default mongoose.model('Receipt', ReceiptSchema, 'receipt')
