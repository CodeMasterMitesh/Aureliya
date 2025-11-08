import mongoose from 'mongoose'
const { Schema } = mongoose

const StocktransferSchema = new Schema({
  id: { type: Number }, // id int(11)
  fromgodown: { type: String }, // fromgodown varchar(255)
  togodown: { type: String }, // togodown varchar(255)
  datetime: { type: Date }, // datetime datetime
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  tobranch: { type: Number }, // tobranch int(11)
  frombranch: { type: Number }, // frombranch int(11)
  remarks: { type: String }, // remarks varchar(255)
  total: { type: Number }, // total decimal(15
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  grnid: { type: Number }, // grnid int(11)
  branch: { type: Number }, // branch int(11)
  approved: { type: String }, // approved varchar(11)
  adminrate: { type: String }, // adminrate varchar(50)
}, { timestamps: false })

export default mongoose.model('Stocktransfer', StocktransferSchema, 'stocktransfer')
