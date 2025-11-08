import mongoose from 'mongoose'
const { Schema } = mongoose

const CustomerpricelistSchema = new Schema({
  id: { type: Number }, // id int(11)
  supplier: { type: String }, // supplier varchar(255)
  product: { type: Number }, // product int(11)
  rate: { type: Number }, // rate decimal(15
  partname: { type: String }, // partname varchar(255)
  partno: { type: String }, // partno varchar(255)
  unit: { type: String }, // unit varchar(255)
  authorizedperson: { type: String }, // authorizedperson varchar(255)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  approved: { type: String }, // approved varchar(25)
  attachment: { type: String }, // attachment varchar(255)
  attachment2: { type: String }, // attachment2 varchar(255)
  attachment3: { type: String }, // attachment3 varchar(255)
  design: { type: String }, // design varchar(255)
  paymentterms: { type: String }, // paymentterms varchar(255)
  customerid: { type: Number }, // customerid int(11)
}, { timestamps: false })

export default mongoose.model('Customerpricelist', CustomerpricelistSchema, 'customerpricelist')
