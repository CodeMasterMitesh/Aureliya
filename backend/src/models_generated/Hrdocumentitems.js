import mongoose from 'mongoose'
const { Schema } = mongoose

const HrdocumentitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  documentid: { type: Number }, // documentid int(11)
  name: { type: String }, // name varchar(255)
  attach: { type: String }, // attach text
  attach1: { type: String }, // attach1 text
  company: { type: Number }, // company int(11)
  issuedate: { type: Date }, // issuedate date
  expirydate: { type: Date }, // expirydate date
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modefiedby: { type: Number }, // modefiedby int(11)
  modefieddatetime: { type: Date }, // modefieddatetime datetime
}, { timestamps: false })

export default mongoose.model('Hrdocumentitems', HrdocumentitemsSchema, 'hrdocumentitems')
