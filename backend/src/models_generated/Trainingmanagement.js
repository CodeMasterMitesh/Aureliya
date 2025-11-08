import mongoose from 'mongoose'
const { Schema } = mongoose

const TrainingmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  employeeid: { type: Number }, // employeeid int(11)
  trainerid: { type: Number }, // trainerid int(11)
  course: { type: String }, // course varchar(100)
  assessment: { type: String }, // assessment varchar(100)
  expirydate: { type: Date }, // expirydate date
  status: { type: String }, // status varchar(50)
  date: { type: Date }, // date date
}, { timestamps: false })

export default mongoose.model('Trainingmanagement', TrainingmanagementSchema, 'trainingmanagement')
