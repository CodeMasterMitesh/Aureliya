import mongoose from 'mongoose'
const { Schema } = mongoose

const InquirySchema = new Schema({
  id: { type: Number }, // id int(11)
  date: { type: Date }, // date date
  remarks: { type: String }, // remarks varchar(255)
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
  client: { type: Number }, // client int(11)
  fstart: { type: Number }, // fstart int(11)
  status: { type: String }, // status varchar(20)
  assignedUserId: { type: Number }, // assigned_user_id int(11)
  sms: { type: String }, // sms varchar(20)
  typeField: { type: String }, // type varchar(20)
  type2: { type: String }, // type2 varchar(20)
  priority: { type: String }, // priority varchar(20)
  mobile: { type: String }, // mobile varchar(20)
  email: { type: String }, // email varchar(25)
  inquiryno: { type: Number }, // inquiryno int(12)
}, { timestamps: false })

export default mongoose.model('Inquiry', InquirySchema, 'inquiry')
