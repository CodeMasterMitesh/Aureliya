import mongoose from 'mongoose'
const { Schema } = mongoose

const LocationmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  branch: { type: String }, // branch varchar(255)
  godownname: { type: String }, // godownname varchar(255)
  rackName: { type: String }, // rack_name varchar(255)
  level: { type: String }, // level varchar(50)
  name: { type: String }, // name varchar(255)
  typeField: { type: String }, // type varchar(100)
  capacity: { type: String }, // capacity varchar(100)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Locationmaster', LocationmasterSchema, 'locationmaster')
