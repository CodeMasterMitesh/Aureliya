import mongoose from 'mongoose'
const { Schema } = mongoose

const InventoryproductSchema = new Schema({
  name: { type: String }, // name varchar(255)
  code: { type: String }, // code varchar(255)
  batchnumber: { type: String }, // batchnumber varchar(25)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  mdate: { type: Date }, // mdate date
  edate: { type: Date }, // edate date
  storageconditions: { type: String }, // storageconditions varchar(255)
  testid: { type: Number }, // testid int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  description: { type: String }, // description varchar(255)
  barcode: { type: String }, // barcode varchar(50)
  itemType: { type: String }, // item_type varchar(50)
  category: { type: Number }, // category int(11)
  categoryvalue: { type: String }, // categoryvalue varchar(255)
  alias1: { type: String }, // alias1 varchar(255)
  alias2: { type: String }, // alias2 varchar(255)
  alias3: { type: String }, // alias3 varchar(255)
  alias4: { type: String }, // alias4 varchar(255)
  alias5: { type: String }, // alias5 varchar(255)
  alias6: { type: String }, // alias6 varchar(255)
  detailedDescription: { type: String }, // detailed_description varchar(255)
  qcin: { type: String }, // qcin varchar(255)
  qcsampleqty: { type: String }, // qcsampleqty varchar(50)
  unit: { type: Number }, // unit int(11)
  remarks: { type: String }, // remarks varchar(50)
  size: { type: Number }, // size int(11)
  whereused: { type: String }, // whereused varchar(50)
  productioncode: { type: String }, // productioncode varchar(50)
  pricelist: { type: String }, // pricelist varchar(50)
  batchnooption: { type: String }, // batchnooption varchar(50)
  batchnotype: { type: String }, // batchnotype varchar(50)
  batchnopattern: { type: String }, // batchnopattern varchar(50)
  parameter1: { type: String }, // parameter1 varchar(50)
  parameter2: { type: String }, // parameter2 varchar(50)
  csv: { type: String }, // csv varchar(50)
  bomexpectedqty: { type: String }, // bomexpectedqty varchar(50)
  printname: { type: String }, // printname varchar(50)
  hsncode: { type: String }, // hsncode varchar(50)
  salesRate: { type: Number }, // sales_rate decimal(15
  purchaseRate: { type: Number }, // purchase_rate decimal(15
  mrp: { type: Number }, // mrp decimal(15
  sgst: { type: Number }, // sgst float
  cgst: { type: Number }, // cgst float
  igst: { type: Number }, // igst float
  cess: { type: Number }, // cess float
  qccontrolqty: { type: Number }, // qccontrolqty float
  conversionfactor: { type: String }, // conversionfactor varchar(50)
  stockyesno: { type: String }, // stockyesno varchar(50)
  tally1: { type: String }, // tally1 varchar(50)
  tally2: { type: String }, // tally2 varchar(50)
  tally3: { type: String }, // tally3 varchar(50)
  tally4: { type: String }, // tally4 varchar(50)
  importtype: { type: String }, // importtype varchar(50)
  productionrate: { type: Number }, // productionrate decimal(15
  id: { type: Number }, // id int(11)
  subcategory: { type: Number }, // subcategory int(11)
  guid: { type: String }, // guid varchar(100)
}, { timestamps: false })

export default mongoose.model('Inventoryproduct', InventoryproductSchema, 'inventoryproduct')
