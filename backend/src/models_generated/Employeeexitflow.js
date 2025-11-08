import mongoose from 'mongoose'
const { Schema } = mongoose

const EmployeeexitflowSchema = new Schema({
  id: { type: Number }, // id bigint(20)
  exittype: { type: String }, // exittype varchar(50)
  code: { type: String }, // code varchar(255)
  date: { type: Date }, // date datetime
  releavingdate: { type: Date }, // releavingdate datetime
  attachment: { type: Buffer }, // attachment mediumblob
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime timestamp
  deleteField: { type: Boolean }, // delete tinyint(1)
  active: { type: Boolean }, // active tinyint(1)
  sort: { type: Number }, // sort int(11)
}, { timestamps: false })

export default mongoose.model('Employeeexitflow', EmployeeexitflowSchema, 'employeeexitflow')
