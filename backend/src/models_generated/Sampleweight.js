import mongoose from 'mongoose'
const { Schema } = mongoose

const SampleweightSchema = new Schema({
  id: { type: Number }, // id int(11)
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
  weight: { type: String }, // weight varchar(25)
  date: { type: Date }, // date date
  bookingid: { type: String }, // bookingid varchar(11)
  remarks: { type: String }, // remarks varchar(255)
  testname: { type: String }, // testname varchar(255)
  serialdata: { type: String }, // serialdata text
}, { timestamps: false })

export default mongoose.model('Sampleweight', SampleweightSchema, 'sampleweight')
