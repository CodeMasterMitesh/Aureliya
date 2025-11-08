import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialindentitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  materialindentid: { type: Number }, // materialindentid int(11)
  remark: { type: String }, // remark text
  srno: { type: String }, // srno varchar(255)
  pid: { type: Number }, // pid int(11)
  qty: { type: Number }, // qty int(11)
  barcode: { type: String }, // barcode varchar(255)
  unit: { type: Number }, // unit int(11)
  totalqty: { type: String }, // totalqty varchar(255)
  requestby: { type: Number }, // requestby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
}, { timestamps: false })

export default mongoose.model('Materialindentitem', MaterialindentitemSchema, 'materialindentitem')
