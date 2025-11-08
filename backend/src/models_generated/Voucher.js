import mongoose from 'mongoose'
const { Schema } = mongoose

const VoucherSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  type2: { type: String }, // type2 varchar(50)
  desc: { type: String }, // desc text
  comment: { type: String }, // comment varchar(255)
  voucherdate: { type: Date }, // voucherdate datetime
  typeField: { type: String }, // type varchar(100)
  vouchertotal: { type: String }, // vouchertotal varchar(25)
  voucherno: { type: String }, // voucherno varchar(50)
  company: { type: String }, // company varchar(255)
  branch: { type: Number }, // branch int(11)
  total: { type: Number }, // total float
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  approved: { type: String }, // approved varchar(100)
  chequeno: { type: String }, // chequeno varchar(25)
  chequedate: { type: Date }, // chequedate date
  remarks: { type: String }, // remarks varchar(255)
  bankcash: { type: String }, // bankcash varchar(50)
  ledgerid: { type: Number }, // ledgerid int(11)
  cleardate: { type: Date }, // cleardate date
  chequename: { type: String }, // chequename varchar(50)
  acpay: { type: String }, // acpay varchar(50)
  godown: { type: Number }, // godown int(11)
  guid: { type: String }, // guid varchar(100)
  deleteField: { type: Boolean }, // delete tinyint(1)
}, { timestamps: false })

export default mongoose.model('Voucher', VoucherSchema, 'voucher')
