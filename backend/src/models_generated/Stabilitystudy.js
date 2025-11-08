import mongoose from 'mongoose'
const { Schema } = mongoose

const StabilitystudySchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  code: { type: String }, // code varchar(255)
  qty: { type: String }, // qty varchar(25)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
}, { timestamps: false })

export default mongoose.model('Stabilitystudy', StabilitystudySchema, 'stabilitystudy')
