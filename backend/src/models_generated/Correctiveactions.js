import mongoose from 'mongoose'
const { Schema } = mongoose

const CorrectiveactionsSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  incidentNumber: { type: Number }, // incident_number int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  preliminary: { type: String }, // preliminary varchar(50)
  investigationatt: { type: String }, // investigationatt varchar(50)
  investigation: { type: String }, // investigation varchar(10)
  rootcause: { type: String }, // rootcause varchar(50)
  attachment1: { type: String }, // attachment1 varchar(50)
  attachment2: { type: String }, // attachment2 varchar(50)
  attachment3: { type: String }, // attachment3 varchar(50)
  attachment4: { type: String }, // attachment4 varchar(50)
  review: { type: String }, // review varchar(255)
  description: { type: String }, // description varchar(255)
  attachement: { type: String }, // attachement varchar(50)
}, { timestamps: false })

export default mongoose.model('Correctiveactions', CorrectiveactionsSchema, 'correctiveactions')
