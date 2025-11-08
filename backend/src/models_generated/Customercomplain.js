import mongoose from 'mongoose'
const { Schema } = mongoose

const CustomercomplainSchema = new Schema({
  id: { type: Number }, // id int(11)
  contactid: { type: Number }, // contactid int(11)
  saleid: { type: Number }, // saleid int(11)
  datetime: { type: Date }, // datetime datetime
  remarks: { type: String }, // remarks text
  status: { type: String }, // status varchar(25)
  priority: { type: String }, // priority varchar(25)
}, { timestamps: false })

export default mongoose.model('Customercomplain', CustomercomplainSchema, 'customercomplain')
