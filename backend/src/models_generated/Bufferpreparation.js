import mongoose from 'mongoose'
const { Schema } = mongoose

const BufferpreparationSchema = new Schema({
  id: { type: Number }, // id int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  name: { type: String }, // name varchar(100)
  number: { type: String }, // number varchar(100)
  lotno: { type: String }, // lotno varchar(100)
  action: { type: String }, // action varchar(50)
  bufferpreparationdate: { type: Date }, // bufferpreparationdate date
  date: { type: Date }, // date date
  usebeforedate: { type: Date }, // usebeforedate date
  tvolume: { type: Number }, // tvolume float
  procedure: { type: String }, // procedure text
  preparedby: { type: Number }, // preparedby int(11)
  checkedby: { type: Number }, // checkedby int(11)
  typeField: { type: String }, // type varchar(100)
  bookingid: { type: Number }, // bookingid int(11)
  bookingtestid: { type: Number }, // bookingtestid int(11)
  testname: { type: String }, // testname varchar(50)
  reffrom: { type: String }, // reffrom varchar(50)
  refform: { type: String }, // refform varchar(50)
}, { timestamps: false })

export default mongoose.model('Bufferpreparation', BufferpreparationSchema, 'bufferpreparation')
