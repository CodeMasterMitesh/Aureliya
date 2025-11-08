import mongoose from 'mongoose'
const { Schema } = mongoose

const QuotationSchema = new Schema({
  id: { type: Number }, // id int(11)
  contactid: { type: Number }, // contactid int(11)
  clientid: { type: Number }, // clientid int(11)
  quotationdate: { type: Date }, // quotationdate datetime
  shippingpolicy: { type: String }, // shippingpolicy text
  subject: { type: String }, // subject varchar(255)
  validuntildate: { type: Date }, // validuntildate datetime
  discount: { type: String }, // discount varchar(11)
  total: { type: String }, // total varchar(11)
  status: { type: String }, // status varchar(25)
  quotationno: { type: String }, // quotationno varchar(25)
  reference: { type: String }, // reference varchar(25)
  remarks: { type: String }, // remarks text
  category: { type: String }, // category varchar(25)
  details: { type: String }, // details text
  tat: { type: String }, // tat varchar(25)
  typeField: { type: String }, // type varchar(50)
  currencytype: { type: String }, // currencytype varchar(10)
  isgrandtotal: { type: String }, // isgrandtotal varchar(10)
  paymentterm: { type: String }, // paymentterm varchar(255)
  note: { type: String }, // note text
  approveby: { type: String }, // approveby varchar(255)
  authorizedposition: { type: String }, // authorizedposition varchar(255)
  checkedposition: { type: String }, // checkedposition varchar(255)
  discountper: { type: Number }, // discountper float
  discountcgst: { type: Number }, // discountcgst decimal(15
  cgstper: { type: Number }, // cgstper float
  sgst: { type: Number }, // sgst decimal(15
  sgstper: { type: Number }, // sgstper float
  igst: { type: Number }, // igst decimal(15
  igstper: { type: Number }, // igstper float
  cgst: { type: Number }, // cgst decimal(15
  subtotal: { type: Number }, // subtotal decimal(15
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  inquiryid: { type: Number }, // inquiryid int(11)
}, { timestamps: false })

export default mongoose.model('Quotation', QuotationSchema, 'quotation')
