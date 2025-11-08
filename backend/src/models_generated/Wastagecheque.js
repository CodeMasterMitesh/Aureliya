import mongoose from 'mongoose'
const { Schema } = mongoose

const WastagechequeSchema = new Schema({
  id: { type: Number }, // id int(11)
  entrytype: { type: String }, // entrytype varchar(20)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  enterby: { type: Number }, // enterby int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  date: { type: Date }, // date date
  ledgerid: { type: Number }, // ledgerid int(11)
  chequenumber: { type: String }, // chequenumber varchar(255)
  remarks: { type: String }, // remarks varchar(255)
  company: { type: String }, // company varchar(50)
  auditremarks: { type: String }, // auditremarks varchar(50)
}, { timestamps: false })

export default mongoose.model('Wastagecheque', WastagechequeSchema, 'wastagecheque')
