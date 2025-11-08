import mongoose from 'mongoose'
const { Schema } = mongoose

const ColumnmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  typeofcolumn: { type: String }, // typeofcolumn varchar(100)
  date: { type: Date }, // date date
  name: { type: String }, // name varchar(100)
  dimensions: { type: String }, // dimensions varchar(100)
  make: { type: String }, // make varchar(100)
  model: { type: String }, // model varchar(100)
  serialno: { type: String }, // serialno varchar(100)
  columnid: { type: String }, // columnid varchar(100)
  dateofperformanc: { type: Date }, // dateofperformanc date
  performby: { type: String }, // performby varchar(100)
  status: { type: String }, // status varchar(100)
  issuedto: { type: Date }, // issuedto date
  dateissuance: { type: String }, // dateissuance varchar(100)
  checkedby: { type: String }, // checkedby varchar(100)
  injections: { type: String }, // injections varchar(100)
  remarks: { type: String }, // remarks varchar(100)
  header: { type: String }, // header varchar(100)
}, { timestamps: false })

export default mongoose.model('Columnmaster', ColumnmasterSchema, 'columnmaster')
