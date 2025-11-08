import mongoose from 'mongoose'
const { Schema } = mongoose

const NewsSchema = new Schema({
  id: { type: Number }, // id int(11)
  title: { type: String }, // title varchar(255)
  content: { type: String }, // content text
  newsDate: { type: Date }, // news_date date
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  deleteField: { type: Number }, // delete int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modefiedby: { type: Number }, // modefiedby int(11)
}, { timestamps: false })

export default mongoose.model('News', NewsSchema, 'news')
