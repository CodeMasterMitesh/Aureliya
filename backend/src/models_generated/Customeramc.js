import mongoose from 'mongoose'
const { Schema } = mongoose

const CustomeramcSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  customerid: { type: Number }, // customerid int(11)
  typeField: { type: String }, // type varchar(255)
  startdate: { type: Date }, // startdate date
  totalAmc: { type: Number }, // total_amc float
  status: { type: String }, // status varchar(25)
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
  amc: { type: Number }, // amc int(11)
  enddate: { type: Date }, // enddate date
  remarks: { type: String }, // remarks text
  amcbasic: { type: Number }, // amcbasic float
  gstper: { type: Number }, // gstper float
  gstamt: { type: Number }, // gstamt float
  total: { type: Number }, // total float
  pvisits: { type: String }, // pvisits varchar(100)
  customername: { type: String }, // customername varchar(255)
  productname: { type: String }, // productname varchar(255)
  serialno: { type: String }, // serialno varchar(255)
  address: { type: String }, // address varchar(255)
  laboratory: { type: String }, // laboratory varchar(255)
  salesperson: { type: Number }, // salesperson int(11)
}, { timestamps: false })

export default mongoose.model('Customeramc', CustomeramcSchema, 'customeramc')
