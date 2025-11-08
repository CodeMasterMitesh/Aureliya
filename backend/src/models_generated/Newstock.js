import mongoose from 'mongoose'
const { Schema } = mongoose

const NewstockSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  barnch: { type: Number }, // barnch int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  category: { type: String }, // category varchar(255)
  subcategory: { type: String }, // subcategory varchar(255)
  subsubcategory: { type: String }, // subsubcategory varchar(255)
  qty: { type: String }, // qty varchar(255)
  rate: { type: String }, // rate varchar(255)
  amount: { type: String }, // amount varchar(255)
  unit: { type: String }, // unit varchar(255)
}, { timestamps: false })

export default mongoose.model('Newstock', NewstockSchema, 'newstock')
