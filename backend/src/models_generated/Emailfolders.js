import mongoose from 'mongoose'
const { Schema } = mongoose

const EmailfoldersSchema = new Schema({
  id: { type: Number }, // id int(11)
  emid: { type: Number }, // emid int(11)
  name: { type: String }, // name varchar(255)
  parent: { type: Number }, // parent int(11)
}, { timestamps: false })

export default mongoose.model('Emailfolders', EmailfoldersSchema, 'emailfolders')
