import mongoose from 'mongoose'
const { Schema } = mongoose

const ChatsSchema = new Schema({
  id: { type: Number }, // id int(11)
  toid: { type: Number }, // toid int(11)
  fromid: { type: Number }, // fromid int(11)
  chat: { type: String }, // chat text
  datetime: { type: Date }, // datetime datetime
  read: { type: Number }, // read int(11)
  attachment: { type: String }, // attachment varchar(255)
}, { timestamps: false })

export default mongoose.model('Chats', ChatsSchema, 'chats')
