import mongoose from 'mongoose'
const { Schema } = mongoose

const PaymentSchema = new Schema({
  id: { type: Number }, // id int(11)
  voucherNo: { type: String }, // voucher_no varchar(100)
  vouchertype: { type: String }, // vouchertype varchar(100)
  date: { type: Date }, // date date
  desc: { type: String }, // desc varchar(255)
  paymenttype: { type: String }, // paymenttype varchar(255)
  bankname: { type: String }, // bankname varchar(255)
  branchname: { type: String }, // branchname varchar(255)
  chequeno: { type: String }, // chequeno varchar(255)
  chequedate: { type: Date }, // chequedate date
  amount: { type: String }, // amount varchar(255)
  company: { type: Number }, // company int(11)
  client: { type: Number }, // client int(11)
  remark: { type: String }, // remark varchar(100)
  tdsAmount: { type: Number }, // tds_amount float
  adjustment: { type: String }, // adjustment varchar(100)
  supplier: { type: Number }, // supplier int(11)
  gtotal: { type: Number }, // gtotal double
  advance: { type: Number }, // advance decimal(15
  total: { type: Number }, // total double
  remaining: { type: Number }, // remaining double
  tds: { type: String }, // tds varchar(25)
  tdstype: { type: String }, // tdstype varchar(50)
  natureofpayment: { type: String }, // natureofpayment varchar(25)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  godown: { type: Number }, // godown int(11)
  bankcash: { type: String }, // bankcash varchar(25)
  ledgerid: { type: Number }, // ledgerid int(11)
  chequeatt: { type: String }, // chequeatt text
  approved: { type: String }, // approved varchar(25)
  att1: { type: String }, // att1 varchar(255)
  att2: { type: String }, // att2 varchar(255)
  att3: { type: String }, // att3 varchar(255)
  att4: { type: String }, // att4 varchar(255)
  onaccount: { type: Number }, // onaccount float
  prevonaccount: { type: Number }, // prevonaccount float
  cleardate: { type: Date }, // cleardate date
  mobile: { type: String }, // mobile varchar(15)
  cashimage: { type: String }, // cashimage varchar(150)
  photo: { type: String }, // photo varchar(255)
  entrytype: { type: String }, // entrytype varchar(20)
  chequename: { type: String }, // chequename varchar(255)
  costcenter: { type: Number }, // costcenter int(11)
  chequenumber: { type: String }, // chequenumber varchar(50)
  tally: { type: Number }, // tally int(11)
  transactiontype: { type: String }, // transactiontype varchar(25)
  utrno: { type: String }, // utrno varchar(50)
  voucherno: { type: Number }, // voucherno int(11)
  voucherid: { type: Number }, // voucherid int(11)
  forexrate: { type: Number }, // forexrate decimal(15
  groupId: { type: Number }, // group_id int(11)
  sms: { type: String }, // sms varchar(20)
  kasar: { type: Number }, // kasar decimal(15
  type2: { type: String }, // type2 varchar(20)
  realbookid: { type: Number }, // realbookid int(11)
  acpay: { type: String }, // acpay varchar(50)
  auditremarks: { type: String }, // auditremarks varchar(255)
  guid: { type: String }, // guid varchar(100)
}, { timestamps: false })

export default mongoose.model('Payment', PaymentSchema, 'payment')
