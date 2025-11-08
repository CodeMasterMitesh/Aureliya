import mongoose from 'mongoose'
const { Schema } = mongoose

const ContactpersonSchema = new Schema({
  id: { type: Number }, // id int(11)
  contectid: { type: Number }, // contectid int(11)
  name: { type: String }, // name varchar(50)
  mobile: { type: String }, // mobile varchar(50)
  email: { type: String }, // email varchar(50)
  department: { type: String }, // department varchar(50)
  position: { type: String }, // position varchar(50)
}, { timestamps: false })

export default mongoose.model('Contactperson', ContactpersonSchema, 'contactperson')
