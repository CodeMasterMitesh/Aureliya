import mongoose from 'mongoose'
const { Schema } = mongoose

const FixedledgerSchema = new Schema({
  id: { type: Number }, // id int(10)
  name: { type: String }, // name varchar(255)
  code: { type: String }, // code varchar(255)
  ledgerid: { type: Number }, // ledgerid int(10)
  company: { type: Number }, // company int(10)
  branch: { type: Number }, // branch int(10)
  enterby: { type: Number }, // enterby int(10)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(10)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  lock: { type: Number }, // lock int(10)
  active: { type: Number }, // active int(10)
  deleteField: { type: Number }, // delete int(10)
}, { timestamps: false })

export default mongoose.model('Fixedledger', FixedledgerSchema, 'fixedledger')
