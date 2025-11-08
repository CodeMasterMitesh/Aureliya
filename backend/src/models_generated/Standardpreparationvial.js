import mongoose from 'mongoose'
const { Schema } = mongoose

const StandardpreparationvialSchema = new Schema({
  id: { type: Number }, // id int(11)
  standardpreprationvialid: { type: Number }, // standardpreprationvialid int(11)
  takenweight: { type: Number }, // takenweight float
  standardpreparationid: { type: Number }, // standardpreparationid int(11)
  unit: { type: String }, // unit varchar(50)
  standardpreprationvialname: { type: String }, // standardpreprationvialname varchar(11)
  avlqty: { type: Number }, // avlqty int(11)
  testid: { type: Number }, // testid int(11)
}, { timestamps: false })

export default mongoose.model('Standardpreparationvial', StandardpreparationvialSchema, 'standardpreparationvial')
