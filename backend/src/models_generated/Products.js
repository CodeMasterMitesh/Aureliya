import mongoose from 'mongoose'
const { Schema } = mongoose

const ProductsSchema = new Schema({
  id: { type: Number }, // id int(11)
  productname: { type: String }, // productname text
  producttype: { type: String }, // producttype varchar(150)
  marker: { type: String }, // marker varchar(100)
  genricname: { type: String }, // genricname varchar(150)
  packingdetail: { type: String }, // packingdetail varchar(100)
  genericCode: { type: Number }, // generic_code int(11)
  description: { type: String }, // description varchar(100)
  pharmacopiea: { type: String }, // pharmacopiea varchar(255)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  unit: { type: String }, // unit varchar(25)
  category: { type: String }, // category varchar(255)
  code: { type: String }, // code varchar(15)
  currentrate: { type: Number }, // currentrate float
  image1: { type: String }, // image1 text
  salesid: { type: Number }, // salesid int(11)
  hsn: { type: String }, // hsn varchar(255)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  enterdatetime: { type: Date }, // enterdatetime datetime
  branch: { type: Number }, // branch int(11)
  monograph: { type: String }, // monograph varchar(255)
  monograph2: { type: String }, // monograph2 varchar(255)
  monograph3: { type: String }, // monograph3 varchar(255)
  monograph4: { type: String }, // monograph4 varchar(255)
  monograph5: { type: String }, // monograph5 varchar(255)
}, { timestamps: false })

export default mongoose.model('Products', ProductsSchema, 'products')
