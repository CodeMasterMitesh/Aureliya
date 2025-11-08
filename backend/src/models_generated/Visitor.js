import mongoose from 'mongoose'
const { Schema } = mongoose

const VisitorSchema = new Schema({
  id: { type: Number }, // id int(11)
  enterby: { type: Number }, // enterby int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  date: { type: Date }, // date date
  tobranch: { type: Number }, // tobranch int(11)
  fromname: { type: String }, // fromname varchar(255)
  fromcompany: { type: String }, // fromcompany varchar(255)
  at: { type: String }, // at varchar(255)
  village: { type: String }, // village varchar(255)
  taluka: { type: String }, // taluka varchar(255)
  district: { type: String }, // district varchar(255)
  pincode: { type: String }, // pincode varchar(255)
  courierthrough: { type: String }, // courierthrough varchar(255)
  particulars: { type: String }, // particulars varchar(255)
  action: { type: String }, // action varchar(255)
  clientid: { type: Number }, // clientid int(11)
  mobile: { type: String }, // mobile varchar(20)
  minuteofmeeting: { type: String }, // minuteofmeeting text
  companyname: { type: String }, // companyname varchar(255)
  eid: { type: Number }, // eid int(11)
}, { timestamps: false })

export default mongoose.model('Visitor', VisitorSchema, 'visitor')
