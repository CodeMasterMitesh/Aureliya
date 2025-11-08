import mongoose from 'mongoose'
const { Schema } = mongoose

const StabilitystudyinitiationSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  productid: { type: Number }, // productid int(11)
  batchnumber: { type: String }, // batchnumber varchar(50)
  storageid: { type: Number }, // storageid int(11)
  sdate: { type: Date }, // sdate date
  edate: { type: Date }, // edate date
}, { timestamps: false })

export default mongoose.model('Stabilitystudyinitiation', StabilitystudyinitiationSchema, 'stabilitystudyinitiation')
