import mongoose from 'mongoose'
const { Schema } = mongoose

const SampleretentionSchema = new Schema({
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  action: { type: String }, // action varchar(50)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  name: { type: String }, // name varchar(100)
  number: { type: String }, // number varchar(100)
  retentiondate: { type: Date }, // retentiondate date
  completiondate: { type: Date }, // completiondate date
  destructiondate: { type: Date }, // destructiondate date
  bookingid: { type: Number }, // bookingid int(11)
  bookingtestid: { type: Number }, // bookingtestid int(11)
  date: { type: Date }, // date date
  testname: { type: String }, // testname varchar(50)
  id: { type: Number }, // id int(11)
  accessqty: { type: Number }, // accessqty int(11)
}, { timestamps: false })

export default mongoose.model('Sampleretention', SampleretentionSchema, 'sampleretention')
