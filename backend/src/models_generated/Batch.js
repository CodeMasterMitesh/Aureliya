import mongoose from 'mongoose'
const { Schema } = mongoose

const BatchSchema = new Schema({
  id: { type: Number }, // id int(11)
  batchno: { type: Number }, // batchno int(11)
  datetime: { type: Date }, // datetime datetime
  company: { type: String }, // company varchar(255)
  branch: { type: Number }, // branch int(11)
  producttotal: { type: String }, // producttotal varchar(255)
  materialgross: { type: Number }, // materialgross float
  materialactual: { type: Number }, // materialactual float
  total: { type: Number }, // total float
  minid: { type: Number }, // minid int(11)
  fuel: { type: String }, // fuel varchar(25)
  electricity: { type: String }, // electricity varchar(100)
  labour: { type: String }, // labour varchar(25)
  packagingcost: { type: String }, // packagingcost varchar(25)
  othercharges: { type: String }, // othercharges varchar(25)
  transportationcharges: { type: String }, // transportationcharges varchar(25)
  temprature: { type: String }, // temprature varchar(25)
  coolingtime: { type: String }, // coolingtime varchar(25)
  manufacturingtime: { type: String }, // manufacturingtime varchar(25)
  packagingtime: { type: String }, // packagingtime varchar(25)
  color: { type: String }, // color varchar(255)
  karigar: { type: String }, // karigar varchar(255)
  machine: { type: String }, // machine varchar(255)
  method: { type: String }, // method varchar(255)
  destination: { type: Number }, // destination int(11)
  status: { type: String }, // status varchar(25)
  typeField: { type: String }, // type varchar(25)
  department: { type: Number }, // department int(11)
  remarks: { type: String }, // remarks text
  orderid: { type: Number }, // orderid int(11)
  orderreqno: { type: Number }, // orderreqno int(11)
  reqdate: { type: Date }, // reqdate datetime
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  action: { type: String }, // action varchar(25)
  type2: { type: String }, // type2 varchar(20)
  coolingtme: { type: String }, // coolingtme varchar(20)
  manufacturingtme: { type: String }, // manufacturingtme varchar(20)
  packagingtme: { type: String }, // packagingtme varchar(20)
  location: { type: Number }, // location int(11)
}, { timestamps: false })

export default mongoose.model('Batch', BatchSchema, 'batch')
