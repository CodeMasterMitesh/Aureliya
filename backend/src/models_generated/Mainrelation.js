import mongoose from 'mongoose'
const { Schema } = mongoose

const MainrelationSchema = new Schema({
  id: { type: Number }, // id int(11)
  fromcolumn: { type: Number }, // fromcolumn int(11)
  tocolumn: { type: Number }, // tocolumn int(11)
}, { timestamps: false })

export default mongoose.model('Mainrelation', MainrelationSchema, 'mainrelation')
