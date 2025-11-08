import mongoose from 'mongoose'
const { Schema } = mongoose

const JobpostingandadvertisementSchema = new Schema({
  id: { type: Number }, // id int(11)
  jobrequisitionid: { type: Number }, // jobrequisitionid int(11)
  jobpostingdate: { type: Date }, // jobpostingdate date
  postingplatform: { type: Number }, // postingplatform int(11)
  applicationdeadline: { type: Date }, // applicationdeadline date
  jobpostingstatus: { type: String }, // jobpostingstatus varchar(255)
  noofapplicationsreceived: { type: Number }, // noofapplicationsreceived int(11)
  remarks: { type: String }, // remarks text
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  deleteField: { type: Boolean }, // delete tinyint(1)
  active: { type: Boolean }, // active tinyint(1)
  cost: { type: String }, // cost varchar(50)
}, { timestamps: false })

export default mongoose.model('Jobpostingandadvertisement', JobpostingandadvertisementSchema, 'jobpostingandadvertisement')
