import mongoose from 'mongoose'
const { Schema } = mongoose

const PartconcessionnoteitemSchema = new Schema({
  id: { type: Number }, // id int(11)
  partconcessionnoteid: { type: Number }, // partconcessionnoteid int(11)
  parametersconcession: { type: String }, // parametersconcession varchar(255)
  valuedesign: { type: String }, // valuedesign varchar(255)
  actualmeasuredvalue: { type: String }, // actualmeasuredvalue varchar(255)
  deviationdiffobservede: { type: String }, // deviationdiffobservede varchar(255)
  reasonfordeviation: { type: String }, // reasonfordeviation varchar(255)
}, { timestamps: false })

export default mongoose.model('Partconcessionnoteitem', PartconcessionnoteitemSchema, 'partconcessionnoteitem')
