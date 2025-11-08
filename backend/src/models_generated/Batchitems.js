import mongoose from 'mongoose'
const { Schema } = mongoose

const BatchitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  batchid: { type: Number }, // batchid int(11)
  pid: { type: String }, // pid varchar(100)
  mrp: { type: String }, // mrp varchar(255)
  transferrate: { type: String }, // transferrate varchar(200)
  sentqty: { type: String }, // sentqty varchar(200)
  availableqty: { type: String }, // availableqty varchar(200)
  total: { type: String }, // total varchar(200)
  grosstotal: { type: String }, // grosstotal varchar(255)
  actualtotal: { type: String }, // actualtotal varchar(255)
  difference: { type: String }, // difference varchar(255)
  transportationchargesinrs: { type: String }, // transportationchargesinrs varchar(255)
  transportationchargesinper: { type: String }, // transportationchargesinper varchar(255)
  tempratureinrs: { type: String }, // tempratureinrs varchar(255)
  tempratureinper: { type: String }, // tempratureinper varchar(255)
  fuelinrs: { type: String }, // fuelinrs varchar(255)
  fuelinper: { type: String }, // fuelinper varchar(255)
  electricityinrs: { type: String }, // electricityinrs varchar(255)
  electricityinper: { type: String }, // electricityinper varchar(255)
  labourinrs: { type: String }, // labourinrs varchar(255)
  abnormallossinper: { type: String }, // abnormallossinper varchar(255)
  total1: { type: String }, // total1 varchar(255)
  labourinper: { type: String }, // labourinper varchar(255)
  packagingcostinrs: { type: String }, // packagingcostinrs varchar(255)
  packagingcostinper: { type: String }, // packagingcostinper varchar(255)
  otherchargesinrs: { type: String }, // otherchargesinrs varchar(255)
  otherchargesinper: { type: String }, // otherchargesinper varchar(255)
  normallossinrs: { type: String }, // normallossinrs varchar(255)
  normallossinper: { type: String }, // normallossinper varchar(255)
  abnormallossinrs: { type: String }, // abnormallossinrs varchar(255)
  producFtotal1: { type: String }, // produc_ftotal1 varchar(255)
  producFtotal2: { type: String }, // produc_ftotal2 varchar(255)
  producFtotal3: { type: String }, // produc_ftotal3 varchar(255)
  batchqty: { type: String }, // batchqty varchar(255)
  status: { type: String }, // status varchar(25)
  expdate: { type: Date }, // expdate date
  barcode: { type: String }, // barcode varchar(25)
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
  remarks: { type: String }, // remarks varchar(100)
  linetotal: { type: Number }, // linetotal float
  totalqty: { type: Number }, // totalqty float
  totalqty1: { type: Number }, // totalqty1 float
  qty: { type: Number }, // qty int(11)
}, { timestamps: false })

export default mongoose.model('Batchitems', BatchitemsSchema, 'batchitems')
