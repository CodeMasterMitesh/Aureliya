import mongoose from 'mongoose'
const { Schema } = mongoose

const OpeningqtySchema = new Schema({
  id: { type: Number }, // id int(11)
  godown: { type: Number }, // godown int(11)
  approved: { type: String }, // approved varchar(10)
  qty: { type: String }, // qty varchar(25)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  date: { type: Date }, // date date
  branch: { type: Number }, // branch int(11)
  receiveddate: { type: Date }, // receiveddate date
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  total: { type: Number }, // total decimal(20
}, { timestamps: false })

export default mongoose.model('Openingqty', OpeningqtySchema, 'openingqty')
