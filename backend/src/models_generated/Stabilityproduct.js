import mongoose from 'mongoose'
const { Schema } = mongoose

const StabilityproductSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  code: { type: String }, // code varchar(255)
  batchnumber: { type: String }, // batchnumber varchar(25)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  mdate: { type: Date }, // mdate date
  edate: { type: Date }, // edate date
  storageconditions: { type: String }, // storageconditions varchar(255)
  testid: { type: Number }, // testid int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
}, { timestamps: false })

export default mongoose.model('Stabilityproduct', StabilityproductSchema, 'stabilityproduct')
