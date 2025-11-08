import mongoose from 'mongoose'
const { Schema } = mongoose

const NewsReadsSchema = new Schema({
  id: { type: Number }, // id int(11)
  userId: { type: Number }, // user_id int(11)
  newsId: { type: Number }, // news_id int(11)
  readAt: { type: Date }, // read_at datetime
}, { timestamps: false })

export default mongoose.model('NewsReads', NewsReadsSchema, 'news_reads')
