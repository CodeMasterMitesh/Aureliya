import mongoose from 'mongoose'
const { Schema } = mongoose

const PurchaseindentSchema = new Schema({
  id: { type: Number }, // id int(11)
  date: { type: Date }, // date date
  no: { type: String }, // no varchar(20)
  employee: { type: Number }, // employee int(11)
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
  total: { type: Number }, // total float
  approved: { type: String }, // approved varchar(50)
  approved2: { type: String }, // approved2 varchar(255)
  approvedby2: { type: Number }, // approvedby2 int(11)
  approvedby: { type: Number }, // approvedby int(11)
  approveddatetime: { type: Date }, // approveddatetime datetime
  approved2datetime: { type: Date }, // approved2datetime datetime
  note: { type: String }, // note text
}, { timestamps: false })

export default mongoose.model('Purchaseindent', PurchaseindentSchema, 'purchaseindent')
