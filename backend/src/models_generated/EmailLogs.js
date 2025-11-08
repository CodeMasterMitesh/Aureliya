import mongoose from 'mongoose'
const { Schema } = mongoose

const EmailLogsSchema = new Schema({
  id: { type: Number }, // id int(11)
  typeField: { type: String }, // type varchar(50)
  enterby: { type: Number }, // enterby int(11)
  subject: { type: String }, // subject varchar(50)
  body: { type: String }, // body text
  from: { type: String }, // from varchar(50)
  fromname: { type: String }, // fromname varchar(100)
  to: { type: String }, // to varchar(50)
  cc: { type: String }, // cc varchar(50)
  bcc: { type: String }, // bcc varchar(50)
  sent: { type: String }, // sent varchar(50)
  reftable: { type: String }, // reftable varchar(50)
  attachements: { type: String }, // attachements text
  reid: { type: Number }, // reid int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
}, { timestamps: false })

export default mongoose.model('EmailLogs', EmailLogsSchema, 'email_logs')
