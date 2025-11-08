import mongoose from 'mongoose'
const { Schema } = mongoose

const BookingtestgraphSchema = new Schema({
  id: { type: Number }, // id int(11)
  testid: { type: Number }, // testid int(11)
  name: { type: String }, // name varchar(255)
  graph: { type: String }, // graph text
  instrumentcode: { type: Number }, // instrumentcode int(11)
  data: { type: String }, // data text
  document: { type: String }, // document varchar(100)
}, { timestamps: false })

export default mongoose.model('Bookingtestgraph', BookingtestgraphSchema, 'bookingtestgraph')
