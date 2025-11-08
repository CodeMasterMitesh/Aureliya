import mongoose from 'mongoose'
const { Schema } = mongoose

const SamplepreparationSchema = new Schema({
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
  lotno: { type: String }, // lotno varchar(100)
  samplepreparationdate: { type: Date }, // samplepreparationdate date
  usebeforedate: { type: Date }, // usebeforedate date
  tvolume: { type: Number }, // tvolume float
  procedure: { type: String }, // procedure text
  preparedby: { type: Number }, // preparedby int(11)
  checkedby: { type: Number }, // checkedby int(11)
  typeField: { type: String }, // type varchar(100)
  bookingid: { type: Number }, // bookingid int(11)
  bookingtestid: { type: Number }, // bookingtestid int(11)
  date: { type: Date }, // date date
  testname: { type: String }, // testname varchar(50)
  takenweight: { type: Number }, // takenweight float
  volume: { type: Number }, // volume float
  avgweight: { type: Number }, // avgweight float
  totalconcentration: { type: Number }, // totalconcentration float
  id: { type: Number }, // id int(11)
  drugname: { type: String }, // drugname varchar(50)
  refform: { type: String }, // refform varchar(50)
  labelclaim: { type: String }, // labelclaim varchar(50)
  diluent: { type: String }, // diluent varchar(50)
  availQty: { type: Number }, // avail_qty float
  weightprintattachment: { type: String }, // weightprintattachment varchar(255)
  phprintattachment: { type: String }, // phprintattachment varchar(255)
  sampleqty: { type: Number }, // sampleqty float
  equivalentweight: { type: Number }, // equivalentweight float
}, { timestamps: false })

export default mongoose.model('Samplepreparation', SamplepreparationSchema, 'samplepreparation')
