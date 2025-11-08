import mongoose from 'mongoose'
const { Schema } = mongoose

const CashbankSchema = new Schema({
  id: { type: Number }, // id int(11)
  datetime: { type: Date }, // datetime datetime
  cb: { type: String }, // cb varchar(11)
  pr: { type: String }, // pr varchar(11)
  ledgerid: { type: Number }, // ledgerid int(11)
  bankid: { type: Number }, // bankid int(11)
  amount: { type: Number }, // amount int(11)
  chequeno: { type: String }, // chequeno varchar(11)
  description: { type: String }, // description varchar(255)
  company: { type: Number }, // company int(11)
  done: { type: Number }, // done int(11)
  employee: { type: Number }, // employee int(11)
  bankname: { type: String }, // bankname varchar(255)
  branchname: { type: String }, // branchname varchar(255)
  branch: { type: Number }, // branch int(11)
}, { timestamps: false })

export default mongoose.model('Cashbank', CashbankSchema, 'cashbank')
