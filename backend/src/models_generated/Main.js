import mongoose from 'mongoose'
const { Schema } = mongoose

const MainSchema = new Schema({
  id: { type: Number }, // id int(11)
  table: { type: String }, // table varchar(25)
  column: { type: String }, // column varchar(25)
  name: { type: String }, // name varchar(25)
  ingrid: { type: Number }, // ingrid int(11)
  hidden: { type: Number }, // hidden int(11)
}, { timestamps: false })

export default mongoose.model('Main', MainSchema, 'main')
