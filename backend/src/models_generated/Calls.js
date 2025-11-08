import mongoose from 'mongoose'
const { Schema } = mongoose

const CallsSchema = new Schema({
  id: { type: Number }, // id int(11)
  contactid: { type: Number }, // contactid int(11)
  name: { type: String }, // name varchar(50)
  dateEntered: { type: Date }, // date_entered datetime
  dateModified: { type: Date }, // date_modified datetime
  modifiedUserId: { type: String }, // modified_user_id char(36)
  createdBy: { type: String }, // created_by char(36)
  description: { type: String }, // description text
  deleted: { type: Boolean }, // deleted tinyint(1)
  assignedUserId: { type: String }, // assigned_user_id char(36)
  durationHours: { type: Number }, // duration_hours int(11)
  durationMinutes: { type: Number }, // duration_minutes int(11)
  dateStart: { type: Date }, // date_start datetime
  dateEnd: { type: Date }, // date_end datetime
  parentType: { type: String }, // parent_type varchar(255)
  status: { type: String }, // status varchar(100)
  direction: { type: String }, // direction varchar(100)
  parentId: { type: String }, // parent_id char(36)
  reminderTime: { type: Number }, // reminder_time int(11)
  emailReminderTime: { type: Number }, // email_reminder_time int(11)
  emailReminderSent: { type: Boolean }, // email_reminder_sent tinyint(1)
  outlookId: { type: String }, // outlook_id varchar(255)
  repeatType: { type: String }, // repeat_type varchar(36)
  repeatInterval: { type: Number }, // repeat_interval int(11)
  repeatDow: { type: String }, // repeat_dow varchar(7)
  repeatUntil: { type: Date }, // repeat_until date
  repeatCount: { type: Number }, // repeat_count int(11)
  repeatParentId: { type: String }, // repeat_parent_id char(36)
  recurringSource: { type: String }, // recurring_source varchar(36)
}, { timestamps: false })

export default mongoose.model('Calls', CallsSchema, 'calls')
