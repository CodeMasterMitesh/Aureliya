import mongoose from 'mongoose'
const { Schema } = mongoose

const ComplaintmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  saleid: { type: Number }, // saleid int(11)
  date: { type: Date }, // date date
  description: { type: String }, // description text
  resolution: { type: String }, // resolution varchar(50)
  employeeid: { type: Number }, // employeeid int(11)
  remarks: { type: String }, // remarks text
  typeField: { type: String }, // type varchar(25)
  status: { type: String }, // status varchar(25)
  customerid: { type: Number }, // customerid int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Complaintmanagement', ComplaintmanagementSchema, 'complaintmanagement')
