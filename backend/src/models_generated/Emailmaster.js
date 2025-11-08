import mongoose from 'mongoose'
const { Schema } = mongoose

const EmailmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  eid: { type: Number }, // eid int(11)
  username: { type: String }, // username varchar(255)
  password: { type: String }, // password varchar(255)
  incomingMailServer: { type: String }, // incoming-mail_server varchar(50)
  incomingMailServerPort: { type: String }, // incoming-mail_server_port varchar(10)
  outgoingMailServer: { type: String }, // outgoing_mail_server varchar(50)
  outgoingMailPort: { type: String }, // outgoing_mail_port varchar(10)
  incomingtype: { type: String }, // incomingtype varchar(10)
}, { timestamps: false })

export default mongoose.model('Emailmaster', EmailmasterSchema, 'emailmaster')
