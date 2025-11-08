import mongoose from 'mongoose'
const { Schema } = mongoose

const StockjournalSchema = new Schema({
  id: { type: Number }, // id int(11)
  stockjournalno: { type: String }, // stockjournalno varchar(100)
  date: { type: Date }, // date datetime
  pgtotal: { type: Number }, // pgtotal float
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
  mgtotal: { type: Number }, // mgtotal float
  frombranch: { type: Number }, // frombranch int(11)
  tobranch: { type: Number }, // tobranch int(11)
  togodown: { type: Number }, // togodown int(11)
  remarks: { type: String }, // remarks varchar(255)
  godown: { type: Number }, // godown int(11)
  tally: { type: Number }, // tally int(11)
  approved: { type: String }, // approved varchar(15)
  approvedby: { type: Number }, // approvedby int(11)
  contra: { type: String }, // contra varchar(5)
}, { timestamps: false })

export default mongoose.model('Stockjournal', StockjournalSchema, 'stockjournal')
