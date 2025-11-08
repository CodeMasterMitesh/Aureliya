import mongoose from 'mongoose'
const { Schema } = mongoose

const BookingtestjsonSchema = new Schema({
  bookingtestid: { type: Number }, // bookingtestid int(11)
  jsondata: { type: String }, // jsondata longtext
  id: { type: Number }, // id int(11)
}, { timestamps: false })

export default mongoose.model('Bookingtestjson', BookingtestjsonSchema, 'bookingtestjson')
