import mongoose from 'mongoose'
const { Schema } = mongoose

const TaskCommentsSchema = new Schema({
  id: { type: Number }, // id int(11)
  taskId: { type: Number }, // task_id int(11)
  commentText: { type: String }, // comment_text text
  attachment: { type: String }, // attachment varchar(255)
  status: { type: String }, // status varchar(15)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  enterby: { type: Number }, // enterby int(11)
}, { timestamps: false })

export default mongoose.model('TaskComments', TaskCommentsSchema, 'task_comments')
