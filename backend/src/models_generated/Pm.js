import mongoose from 'mongoose'
const { Schema } = mongoose

const PmSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  customerid: { type: Number }, // customerid int(11)
  startdate: { type: Date }, // startdate date
  enddate: { type: Date }, // enddate date
  totalPm: { type: Number }, // total_pm float
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
  pm: { type: Number }, // pm int(11)
  machineid: { type: Number }, // machineid int(11)
}, { timestamps: false })

export default mongoose.model('Pm', PmSchema, 'pm')
