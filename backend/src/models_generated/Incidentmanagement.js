import mongoose from 'mongoose'
const { Schema } = mongoose

const IncidentmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  description: { type: String }, // description varchar(255)
  testname: { type: String }, // testname varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  client: { type: Number }, // client int(11)
  incidentno: { type: String }, // incidentno varchar(50)
  incidenttypeid: { type: Number }, // incidenttypeid int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  incidentDate: { type: Date }, // incident_date date
  bookingno: { type: Number }, // bookingno int(11)
  instrumentid: { type: Number }, // instrumentid int(11)
  responsibleperson: { type: Number }, // responsibleperson int(11)
  location: { type: String }, // location varchar(50)
  attachment1: { type: String }, // attachment1 varchar(50)
  attachment4: { type: String }, // attachment4 varchar(50)
  attachment3: { type: String }, // attachment3 varchar(50)
  attachment2: { type: String }, // attachment2 varchar(50)
}, { timestamps: false })

export default mongoose.model('Incidentmanagement', IncidentmanagementSchema, 'incidentmanagement')
