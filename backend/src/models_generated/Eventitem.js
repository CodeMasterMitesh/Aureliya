import mongoose from 'mongoose'
const { Schema } = mongoose

const EventitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  srno: { type: Number }, // srno int(11)
  name: { type: String }, // name varchar(20)
  mobile: { type: String }, // mobile varchar(15)
  email: { type: String }, // email varchar(30)
  employeeId: { type: Number }, // employee_id int(11)
}, { timestamps: false })

export default mongoose.model('Eventitem', EventitemSchema, 'eventitem')
