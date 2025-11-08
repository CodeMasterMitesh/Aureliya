import mongoose from 'mongoose'
const { Schema } = mongoose

const Attlog1Schema = new Schema({
  id: { type: Number }, // id int(11)
  enrollmentno: { type: String }, // enrollmentno varchar(10)
  datetime: { type: Date }, // datetime datetime
  branch: { type: Number }, // branch int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  machine: { type: Number }, // machine int(11)
  reason: { type: String }, // reason varchar(255)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  tour: { type: Number }, // tour int(11)
  approved: { type: String }, // approved varchar(15)
  employeeid: { type: Number }, // employeeid int(11)
}, { timestamps: false })

export default mongoose.model('Attlog1', Attlog1Schema, 'attlog1')
