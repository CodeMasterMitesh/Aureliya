import mongoose from 'mongoose'
const { Schema } = mongoose

const OpportunitiesSchema = new Schema({
  id: { type: Number }, // id int(11)
  contactid: { type: Number }, // contactid int(11)
  subject: { type: String }, // subject varchar(255)
  expectedrevenue: { type: String }, // expectedrevenue varchar(255)
  expectedrevenueat: { type: String }, // expectedrevenueat% varchar(255)
  nextfolowupdate: { type: Date }, // nextfolowupdate date
  closingdate: { type: Date }, // closingdate date
  priority: { type: String }, // priority varchar(255)
  salesperson: { type: String }, // salesperson varchar(255)
  categories: { type: String }, // categories varchar(255)
  productid: { type: Number }, // productid int(11)
  status: { type: String }, // status varchar(25)
}, { timestamps: false })

export default mongoose.model('Opportunities', OpportunitiesSchema, 'opportunities')
