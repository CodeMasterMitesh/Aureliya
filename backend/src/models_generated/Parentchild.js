import mongoose from 'mongoose'
const { Schema } = mongoose

const ParentchildSchema = new Schema({
  id: { type: Number }, // id int(11)
  eid: { type: Number }, // eid int(11)
  parent: { type: Number }, // parent int(11)
}, { timestamps: false })

export default mongoose.model('Parentchild', ParentchildSchema, 'parentchild')
