import mongoose from 'mongoose'
const { Schema } = mongoose

const ChequebookSchema = new Schema({
  id: { type: Number }, // id int(11)
  bankname: { type: Number }, // bankname int(11)
  chequenofrom: { type: String }, // chequenofrom varchar(255)
  chequenoto: { type: String }, // chequenoto varchar(255)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  total: { type: Number }, // total int(11)
}, { timestamps: false })

export default mongoose.model('Chequebook', ChequebookSchema, 'chequebook')
