import mongoose from 'mongoose'
const { Schema } = mongoose

const PurchasebillitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  revision: { type: Number }, // revision int(11)
  partno: { type: String }, // partno varchar(255)
  qty: { type: Number }, // qty float
  rate: { type: Number }, // rate decimal(15
  unit: { type: String }, // unit varchar(255)
  disc: { type: Number }, // disc decimal(10
  typedisc: { type: String }, // typedisc varchar(25)
  amount: { type: Number }, // amount decimal(15
  cgstper: { type: Number }, // cgstper float
  cgst: { type: Number }, // cgst decimal(15
  sgstper: { type: Number }, // sgstper float
  sgst: { type: Number }, // sgst decimal(15
  igstper: { type: Number }, // igstper float
  igst: { type: Number }, // igst decimal(15
  netamount: { type: Number }, // netamount decimal(15
  subtotal: { type: Number }, // subtotal decimal(15
  totalcgst: { type: Number }, // totalcgst decimal(15
  totalsgst: { type: Number }, // totalsgst decimal(15
  totaligst: { type: Number }, // totaligst decimal(15
  roundoff: { type: Number }, // roundoff decimal(15
  total: { type: Number }, // total decimal(15
  purchaseid: { type: Number }, // purchaseid int(11)
  ledgerid: { type: Number }, // ledgerid int(11)
  gross: { type: Number }, // gross decimal(15
  purchasebillid: { type: Number }, // purchasebillid int(11)
  taxamount: { type: Number }, // taxamount decimal(15
  location: { type: Number }, // location int(11)
  branchstate: { type: String }, // branchstate varchar(255)
  supplierstate: { type: String }, // supplierstate varchar(255)
  gstper: { type: Number }, // gstper float
  batchno: { type: String }, // batchno varchar(25)
  expirydate: { type: Date }, // expirydate date
  rcmcgstper: { type: Number }, // rcmcgstper decimal(10
  rcmsgstper: { type: Number }, // rcmsgstper decimal(10
  rcmigstper: { type: Number }, // rcmigstper decimal(10
  rcmcgst: { type: Number }, // rcmcgst decimal(10
  rcmsgst: { type: Number }, // rcmsgst decimal(10
  rcmigst: { type: Number }, // rcmigst decimal(10
  grnid: { type: String }, // grnid varchar(255)
  srno: { type: String }, // srno varchar(255)
  grnrate: { type: Number }, // grnrate decimal(10
  hsncode: { type: String }, // hsncode varchar(25)
}, { timestamps: false })

export default mongoose.model('Purchasebillitems', PurchasebillitemsSchema, 'purchasebillitems')
