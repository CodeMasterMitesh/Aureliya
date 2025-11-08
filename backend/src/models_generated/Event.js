import mongoose from 'mongoose'
const { Schema } = mongoose

const EventSchema = new Schema({
  id: { type: Number }, // id int(11)
  eventtype: { type: String }, // eventtype varchar(100)
  offlineOnline: { type: String }, // offline_online varchar(50)
  datetime: { type: Date }, // datetime datetime
  description: { type: String }, // description text
  reminderdate: { type: Date }, // reminderdate datetime
  eventvenue: { type: String }, // eventvenue varchar(30)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  platform: { type: String }, // platform varchar(10)
  eventbudget: { type: String }, // eventbudget varchar(20)
}, { timestamps: false })

export default mongoose.model('Event', EventSchema, 'event')
