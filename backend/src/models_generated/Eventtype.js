import mongoose from 'mongoose'
const { Schema } = mongoose

const EventtypeSchema = new Schema({
  id: { type: Number }, // id int(11)
  date: { type: Date }, // date date
  name: { type: String }, // name varchar(50)
  code: { type: String }, // code varchar(255)
  uid: { type: Number }, // uid int(11)
  timestamp: { type: Date }, // timestamp timestamp
  state: { type: String }, // state varchar(255)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Eventtype', EventtypeSchema, 'eventtype')
