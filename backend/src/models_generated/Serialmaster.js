import mongoose from 'mongoose'
const { Schema } = mongoose

const SerialmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  lock: { type: Number }, // lock int(11)
  active: { type: Number }, // active int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  name: { type: String }, // name varchar(200)
  financialyear: { type: Number }, // financialyear int(11)
  prefix: { type: String }, // prefix varchar(50)
  suffix: { type: String }, // suffix varchar(50)
  noofdigit: { type: String }, // noofdigit varchar(50)
  vouchertype: { type: String }, // vouchertype varchar(50)
  potype: { type: String }, // potype varchar(20)
  itemcategory: { type: Number }, // itemcategory int(11)
}, { timestamps: false })

export default mongoose.model('Serialmaster', SerialmasterSchema, 'serialmaster')
