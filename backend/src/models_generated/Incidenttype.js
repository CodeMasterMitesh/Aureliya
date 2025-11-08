import mongoose from 'mongoose'
const { Schema } = mongoose

const IncidenttypeSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  definition: { type: String }, // definition varchar(255)
  example: { type: String }, // example varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
}, { timestamps: false })

export default mongoose.model('Incidenttype', IncidenttypeSchema, 'incidenttype')
