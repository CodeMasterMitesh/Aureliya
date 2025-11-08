import mongoose from 'mongoose'
const { Schema } = mongoose

const StabilitystudyinitiationitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  stabilitystudyinitiationid: { type: Number }, // stabilitystudyinitiationid int(11)
  srno: { type: Number }, // srno int(11)
  days: { type: String }, // days varchar(50)
  date: { type: Date }, // date date
  description: { type: String }, // description varchar(255)
}, { timestamps: false })

export default mongoose.model('Stabilitystudyinitiationitem', StabilitystudyinitiationitemSchema, 'stabilitystudyinitiationitem')
