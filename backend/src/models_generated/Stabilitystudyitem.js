import mongoose from 'mongoose'
const { Schema } = mongoose

const StabilitystudyitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  stabilitystudyid: { type: Number }, // stabilitystudyid int(11)
  days: { type: String }, // days varchar(50)
  description: { type: String }, // description varchar(255)
}, { timestamps: false })

export default mongoose.model('Stabilitystudyitem', StabilitystudyitemSchema, 'stabilitystudyitem')
