import mongoose from 'mongoose'
const { Schema } = mongoose

const ReadRemindersSchema = new Schema({
  id: { type: Number }, // id int(11)
  reminderId: { type: Number }, // reminder_id int(11)
  userId: { type: Number }, // user_id int(11)
  readAt: { type: Date }, // read_at datetime
  companyId: { type: Number }, // company_id int(11)
}, { timestamps: false })

export default mongoose.model('ReadReminders', ReadRemindersSchema, 'read_reminders')
