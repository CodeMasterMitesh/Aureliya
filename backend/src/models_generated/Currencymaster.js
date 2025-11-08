import mongoose from 'mongoose'
const { Schema } = mongoose

const CurrencymasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  active: { type: Number }, // active int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  code: { type: String }, // code varchar(100)
  currencyrate: { type: Number }, // currencyrate float
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  currencyname: { type: String }, // currencyname varchar(10)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  name: { type: String }, // name varchar(15)
}, { timestamps: false })

export default mongoose.model('Currencymaster', CurrencymasterSchema, 'currencymaster')
