import mongoose from 'mongoose'
const { Schema } = mongoose

const HolidaymasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  date: { type: Date }, // date date
  name: { type: String }, // name varchar(255)
}, { timestamps: false })

export default mongoose.model('Holidaymaster', HolidaymasterSchema, 'holidaymaster')
