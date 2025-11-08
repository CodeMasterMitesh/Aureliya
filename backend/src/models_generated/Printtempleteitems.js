import mongoose from 'mongoose'
const { Schema } = mongoose

const PrinttempleteitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  printtempleteid: { type: Number }, // printtempleteid int(11)
  pageno: { type: String }, // pageno varchar(50)
  description: { type: String }, // description longtext
  header: { type: String }, // header longtext
  body: { type: String }, // body longtext
  footer: { type: String }, // footer longtext
}, { timestamps: false })

export default mongoose.model('Printtempleteitems', PrinttempleteitemsSchema, 'printtempleteitems')
