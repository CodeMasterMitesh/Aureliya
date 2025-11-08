import mongoose from 'mongoose'
const { Schema } = mongoose

const NotificationSchema = new Schema({
  id: { type: Number }, // id int(11)
  moduleid: { type: Number }, // moduleid int(11)
  text: { type: String }, // text text
  datetime: { type: Date }, // datetime datetime
  db: { type: String }, // db varchar(255)
  uid: { type: Number }, // uid int(11)
  activity: { type: String }, // activity varchar(255)
  aid: { type: Number }, // aid int(11)
  data: { type: String }, // data text
  ip: { type: String }, // ip varchar(25)
}, { timestamps: false })

export default mongoose.model('Notification', NotificationSchema, 'notification')
