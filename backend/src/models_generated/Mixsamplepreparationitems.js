import mongoose from 'mongoose'
const { Schema } = mongoose

const MixsamplepreparationitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  mixsamplepreparationid: { type: Number }, // mixsamplepreparationid int(11)
  testid: { type: Number }, // testid int(11)
  testname: { type: String }, // testname varchar(11)
  finalconcentration: { type: Number }, // finalconcentration float
  taken: { type: Number }, // taken float
  dilution: { type: Number }, // dilution float
  diluent: { type: String }, // diluent varchar(50)
  ppm: { type: Number }, // ppm float
  duedate: { type: Date }, // duedate datetime
  donedate: { type: Date }, // donedate datetime
  takenweight: { type: Number }, // takenweight float
}, { timestamps: false })

export default mongoose.model('Mixsamplepreparationitems', MixsamplepreparationitemsSchema, 'mixsamplepreparationitems')
