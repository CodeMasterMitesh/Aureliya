import mongoose from 'mongoose'
const { Schema } = mongoose

const OtherproductionSchema = new Schema({
  id: { type: Number }, // id int(11)
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
  datetime: { type: Date }, // datetime datetime
  godown: { type: Number }, // godown int(11)
  fpid: { type: Number }, // fpid int(11)
  batchno: { type: String }, // batchno varchar(25)
  approved: { type: String }, // approved varchar(15)
  remarks: { type: String }, // remarks text
  project: { type: Number }, // project int(11)
}, { timestamps: false })

export default mongoose.model('Otherproduction', OtherproductionSchema, 'otherproduction')
