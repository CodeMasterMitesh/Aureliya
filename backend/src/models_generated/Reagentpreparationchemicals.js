import mongoose from 'mongoose'
const { Schema } = mongoose

const ReagentpreparationchemicalsSchema = new Schema({
  id: { type: Number }, // id int(11)
  reagentpreparationid: { type: Number }, // reagentpreparationid int(11)
  chemicalid: { type: Number }, // chemicalid int(11)
  batchno: { type: String }, // batchno varchar(100)
  usebeforedate: { type: Date }, // usebeforedate date
  qty: { type: Number }, // qty float
  branch: { type: Number }, // branch int(11)
  godown: { type: Number }, // godown int(11)
  unit: { type: String }, // unit varchar(50)
}, { timestamps: false })

export default mongoose.model('Reagentpreparationchemicals', ReagentpreparationchemicalsSchema, 'reagentpreparationchemicals')
