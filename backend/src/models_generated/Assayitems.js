import mongoose from 'mongoose'
const { Schema } = mongoose

const AssayitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  assayid: { type: Number }, // assayid int(11)
  typeField: { type: String }, // type varchar(50)
  name: { type: String }, // name varchar(50)
}, { timestamps: false })

export default mongoose.model('Assayitems', AssayitemsSchema, 'assayitems')
