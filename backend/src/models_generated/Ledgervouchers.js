import mongoose from 'mongoose'
const { Schema } = mongoose

const LedgervouchersSchema = new Schema({
  id: { type: Number }, // id int(11)
  ledgerid: { type: Number }, // ledgerid int(11)
  amount: { type: Number }, // amount decimal(12
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
  voucherid: { type: Number }, // voucherid int(11)
  vouchertype: { type: String }, // vouchertype varchar(100)
  voucherdatetime: { type: Date }, // voucherdatetime datetime
  credit: { type: Number }, // credit decimal(12
  debit: { type: Number }, // debit decimal(12
  oppledgerid: { type: Number }, // oppledgerid int(11)
  voucheritemsid: { type: Number }, // voucheritemsid int(11)
  dbtable: { type: String }, // dbtable varchar(100)
  costcenter: { type: Number }, // costcenter int(11)
}, { timestamps: false })

export default mongoose.model('Ledgervouchers', LedgervouchersSchema, 'ledgervouchers')
