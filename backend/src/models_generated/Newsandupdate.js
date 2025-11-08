import mongoose from 'mongoose'
const { Schema } = mongoose

const NewsandupdateSchema = new Schema({
  id: { type: Number }, // id int(11)
  date: { type: Date }, // date date
  news: { type: String }, // news varchar(100)
  status: { type: String }, // status varchar(255)
  uid: { type: Number }, // uid int(11)
  attachment: { type: String }, // attachment varchar(255)
  content: { type: String }, // content longtext
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Newsandupdate', NewsandupdateSchema, 'newsandupdate')
