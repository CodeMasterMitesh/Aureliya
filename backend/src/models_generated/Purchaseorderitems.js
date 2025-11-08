import mongoose from 'mongoose'
const { Schema } = mongoose

const PurchaseorderitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  deesc: { type: String }, // deesc varchar(255)
  purchaseid: { type: Number }, // purchaseid int(11)
  pid: { type: String }, // pid varchar(255)
  revision: { type: Number }, // revision int(11)
  qty: { type: Number }, // qty decimal(15
  rate: { type: String }, // rate varchar(255)
  taxrate: { type: String }, // taxrate varchar(255)
  discount: { type: String }, // discount varchar(255)
  amount: { type: String }, // amount varchar(255)
  mrp: { type: String }, // mrp varchar(255)
  weight: { type: String }, // weight varchar(255)
  miscdiscount: { type: String }, // miscdiscount varchar(255)
  total: { type: String }, // total varchar(255)
  typeField: { type: String }, // type varchar(11)
  category: { type: String }, // category varchar(50)
  subcategory: { type: String }, // subcategory varchar(25)
  barcode: { type: String }, // barcode varchar(255)
  vat: { type: Number }, // vat float
  addVat: { type: Number }, // add_vat float
  freeqty: { type: Number }, // freeqty int(11)
  typename: { type: String }, // typename varchar(255)
  gross: { type: Number }, // gross double
  disc: { type: Number }, // disc float
  vatamount: { type: Number }, // vatamount float
  netamount: { type: String }, // netamount varchar(25)
  typedisc: { type: String }, // typedisc varchar(5)
  srno: { type: String }, // srno varchar(25)
  invoiceno: { type: String }, // invoiceno varchar(255)
  amountofducty: { type: String }, // amountofducty varchar(255)
  receiveddirectlyFrom: { type: String }, // receiveddirectly_from varchar(25)
  receivedfrom: { type: String }, // receivedfrom varchar(25)
  qtyperpack: { type: Number }, // qtyperpack float
  packagingsize: { type: String }, // packagingsize varchar(25)
  priceinrs: { type: Number }, // priceinrs float
  exwork: { type: Number }, // exwork float
  total1: { type: Number }, // total1 float
  admexp: { type: Number }, // admexp float
  total2: { type: Number }, // total2 float
  duty: { type: Number }, // duty float
  totalcost: { type: Number }, // totalcost float
  rate2: { type: Number }, // rate2 float
  rate1: { type: Number }, // rate1 float
  description: { type: String }, // description text
  color: { type: String }, // color varchar(255)
  productcode: { type: String }, // productcode varchar(100)
  make: { type: String }, // make varchar(255)
  workproper: { type: String }, // workproper varchar(20)
  binno: { type: String }, // binno varchar(50)
  addtds: { type: Number }, // addtds float
  ledgerid: { type: Number }, // ledgerid int(11)
  vatper: { type: Number }, // vatper float
  addvatper: { type: Number }, // addvatper float
  discper: { type: Number }, // discper float
  addvat: { type: Number }, // addvat float
  sgstper: { type: Number }, // sgstper float
  sgst: { type: Number }, // sgst float
  cgstper: { type: Number }, // cgstper float
  cgst: { type: Number }, // cgst float
  igstper: { type: Number }, // igstper float
  igst: { type: Number }, // igst float
  hsncode: { type: String }, // hsncode varchar(30)
  assetid: { type: Number }, // assetid int(11)
  unit: { type: Number }, // unit int(11)
  indqty: { type: Number }, // indqty float
  gstper: { type: Number }, // gstper decimal(2
  itemcode: { type: String }, // itemcode varchar(50)
}, { timestamps: false })

export default mongoose.model('Purchaseorderitems', PurchaseorderitemsSchema, 'purchaseorderitems')
