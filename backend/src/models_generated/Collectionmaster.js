import mongoose from 'mongoose'
const { Schema } = mongoose

const CollectionmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  desc: { type: String }, // desc text
}, { timestamps: false })

export default mongoose.model('Collectionmaster', CollectionmasterSchema, 'collectionmaster')
