import mongoose from 'mongoose'
const { Schema } = mongoose

const RegionmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(100)
  parent: { type: Number }, // parent int(11)
  zone: { type: String }, // zone varchar(100)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Regionmaster', RegionmasterSchema, 'regionmaster')
