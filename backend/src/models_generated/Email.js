import mongoose from 'mongoose'
const { Schema } = mongoose

const EmailSchema = new Schema({
  id: { type: Number }, // id int(11)
  efid: { type: Number }, // efid int(11)
  date: { type: String }, // date varchar(255)
  subject: { type: String }, // subject varchar(255)
  messageId: { type: String }, // message_id varchar(255)
  inReplyTo: { type: String }, // in_reply_to varchar(1024)
  reference: { type: String }, // reference varchar(1024)
  toemail: { type: String }, // toemail varchar(1024)
  fromemail: { type: String }, // fromemail varchar(1024)
  cc: { type: String }, // cc varchar(1024)
  replyTo: { type: String }, // reply_to varchar(1024)
  sender: { type: String }, // sender varchar(1024)
  msgno: { type: String }, // Msgno varchar(10)
  recent: { type: String }, // Recent varchar(10)
  unseen: { type: String }, // Unseen varchar(10)
  flagged: { type: String }, // Flagged varchar(10)
  answered: { type: String }, // Answered varchar(10)
  deleted: { type: String }, // Deleted varchar(10)
  draft: { type: String }, // Draft varchar(10)
  size: { type: String }, // Size varchar(25)
  udate: { type: String }, // udate varchar(25)
  textmsg: { type: String }, // textmsg text
  htmlmsg: { type: String }, // htmlmsg text
  attechments: { type: String }, // attechments text
}, { timestamps: false })

export default mongoose.model('Email', EmailSchema, 'email')
