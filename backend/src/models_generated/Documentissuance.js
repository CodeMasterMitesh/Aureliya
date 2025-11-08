import mongoose from 'mongoose'
const { Schema } = mongoose

const DocumentissuanceSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  documenttypeId: { type: Number }, // documenttype_id int(11)
  date: { type: Date }, // date date
  reason: { type: String }, // reason varchar(255)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
}, { timestamps: false })

export default mongoose.model('Documentissuance', DocumentissuanceSchema, 'documentissuance')
