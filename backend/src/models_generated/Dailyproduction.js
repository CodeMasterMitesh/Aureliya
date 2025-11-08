import mongoose from 'mongoose'
const { Schema } = mongoose

const DailyproductionSchema = new Schema({
  id: { type: Number }, // id int(11)
  typeField: { type: String }, // type varchar(50)
  branch: { type: Number }, // branch int(11)
  project: { type: Number }, // project int(11)
  supplier: { type: Number }, // supplier int(11)
  datetime: { type: Date }, // datetime datetime
  remarks: { type: String }, // remarks varchar(200)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  total: { type: Number }, // total double
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  action: { type: String }, // action varchar(10)
  district: { type: String }, // district varchar(25)
  supplieremail: { type: String }, // supplieremail varchar(25)
  suppliermobile: { type: String }, // suppliermobile varchar(15)
  authorizedperson: { type: String }, // authorizedperson varchar(25)
  challanno: { type: String }, // challanno varchar(100)
  pono: { type: String }, // pono varchar(100)
  transferdate: { type: Date }, // transferdate date
  receiveddate: { type: Date }, // receiveddate date
  godown: { type: Number }, // godown int(11)
  status: { type: String }, // status varchar(15)
  approved: { type: String }, // approved varchar(25)
  approvedby: { type: Number }, // approvedby int(11)
  receiversname: { type: String }, // receiversname varchar(255)
  transporter: { type: String }, // transporter varchar(255)
  truckno: { type: String }, // truckno varchar(100)
  lrno: { type: String }, // lrno varchar(50)
  totalfright: { type: Number }, // totalfright double
  servicetax: { type: Number }, // servicetax double
  netpayblefright: { type: Number }, // netpayblefright double
  supplierchallanno: { type: String }, // supplierchallanno varchar(25)
  freight: { type: String }, // freight varchar(50)
  togodown: { type: Number }, // togodown int(11)
  stktrid: { type: Number }, // stktrid int(11)
  drivername: { type: String }, // drivername varchar(255)
  driverlicenceno: { type: String }, // driverlicenceno varchar(50)
  frombranch: { type: Number }, // frombranch int(11)
  tobranch: { type: Number }, // tobranch int(11)
  accept: { type: String }, // accept varchar(15)
  number: { type: String }, // number varchar(20)
}, { timestamps: false })

export default mongoose.model('Dailyproduction', DailyproductionSchema, 'dailyproduction')
