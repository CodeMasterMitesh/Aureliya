import mongoose from 'mongoose'
const { Schema } = mongoose

const BookinginstrumentSchema = new Schema({
  id: { type: Number }, // id int(11)
  testid: { type: Number }, // testid int(11)
  instrument: { type: String }, // instrument varchar(255)
  starttme: { type: String }, // starttme varchar(255)
  endtme: { type: String }, // endtme varchar(255)
  instrumentcode: { type: Number }, // instrumentcode int(11)
  columnid: { type: String }, // columnid varchar(100)
  noofinj: { type: String }, // noofinj varchar(100)
  startdt: { type: Date }, // startdt datetime
  enddt: { type: Date }, // enddt datetime
  instrumentremark: { type: String }, // instrumentremark varchar(255)
  chid: { type: Number }, // chid int(11)
}, { timestamps: false })

export default mongoose.model('Bookinginstrument', BookinginstrumentSchema, 'bookinginstrument')
