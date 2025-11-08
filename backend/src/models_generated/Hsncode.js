import mongoose from 'mongoose'
const { Schema } = mongoose

const HsncodeSchema = new Schema({
  id: { type: Number }, // id int(11)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  hsncode: { type: Number }, // hsncode int(11)
  sgst: { type: Number }, // sgst float
  cgst: { type: Number }, // cgst float
  igst: { type: Number }, // igst float
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  branch: { type: Number }, // branch int(11)
}, { timestamps: false })

export default mongoose.model('Hsncode', HsncodeSchema, 'hsncode')
