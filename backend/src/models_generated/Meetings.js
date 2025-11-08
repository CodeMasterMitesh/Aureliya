import mongoose from 'mongoose'
const { Schema } = mongoose

const MeetingsSchema = new Schema({
  id: { type: Number }, // id int(11)
  contactid: { type: Number }, // contactid int(11)
  name: { type: String }, // name varchar(50)
  description: { type: String }, // description text
  assignedUserId: { type: String }, // assigned_user_id char(36)
  location: { type: String }, // location varchar(50)
  dateStart: { type: Date }, // date_start datetime
  dateEnd: { type: Date }, // date_end datetime
  status: { type: String }, // status varchar(100)
  typeField: { type: String }, // type varchar(255)
  parentId: { type: String }, // parent_id char(36)
  reminderTime: { type: Number }, // reminder_time int(11)
  emailReminderTime: { type: Number }, // email_reminder_time int(11)
  emailReminderSent: { type: Boolean }, // email_reminder_sent tinyint(1)
  repeatType: { type: String }, // repeat_type varchar(36)
  repeatInterval: { type: Number }, // repeat_interval int(11)
  repeatDow: { type: String }, // repeat_dow varchar(7)
  repeatUntil: { type: Date }, // repeat_until date
  repeatCount: { type: Number }, // repeat_count int(11)
  repeatParentId: { type: String }, // repeat_parent_id char(36)
  recurringSource: { type: String }, // recurring_source varchar(36)
  priority: { type: String }, // priority varchar(25)
}, { timestamps: false })

export default mongoose.model('Meetings', MeetingsSchema, 'meetings')
