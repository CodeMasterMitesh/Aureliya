import mongoose from 'mongoose'
const { Schema } = mongoose

const DissolutionconditionSchema = new Schema({
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
  typeField: { type: String }, // type varchar(100)
  bookingid: { type: Number }, // bookingid int(11)
  bookingtestid: { type: Number }, // bookingtestid int(11)
  date: { type: Date }, // date date
  testname: { type: String }, // testname varchar(50)
  specificwavelength: { type: Number }, // specificwavelength float
  totalconcentration: { type: Number }, // totalconcentration float
  id: { type: Number }, // id int(11)
  drugname: { type: String }, // drugname varchar(50)
  refform: { type: String }, // refform varchar(50)
  labelclaim: { type: String }, // labelclaim varchar(50)
  spectrumrange: { type: String }, // spectrumrange varchar(50)
  availQty: { type: Number }, // avail_qty float
  weightprintattachment: { type: String }, // weightprintattachment varchar(255)
  phprintattachment: { type: String }, // phprintattachment varchar(255)
  sampleqty: { type: Number }, // sampleqty float
}, { timestamps: false })

export default mongoose.model('Dissolutioncondition', DissolutionconditionSchema, 'dissolutioncondition')
