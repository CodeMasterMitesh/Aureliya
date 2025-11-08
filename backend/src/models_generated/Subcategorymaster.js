import mongoose from 'mongoose'
const { Schema } = mongoose

const SubcategorymasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  product: { type: String }, // product set('0'
  parent: { type: Number }, // parent int(11)
  image: { type: String }, // image varchar(255)
  sort: { type: Number }, // sort int(11)
  opnGodown: { type: String }, // opn_godown varchar(25)
  opnQty: { type: String }, // opn_qty varchar(25)
  uom: { type: String }, // uom varchar(25)
  opnRate: { type: String }, // opn_rate varchar(25)
  opnAmount: { type: String }, // opn_amount varchar(25)
  image1: { type: String }, // image1 varchar(255)
  image2: { type: String }, // image2 varchar(255)
  image3: { type: String }, // image3 varchar(255)
  image4: { type: String }, // image4 varchar(255)
  level: { type: Number }, // level int(11)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  zone: { type: String }, // zone varchar(20)
  code: { type: String }, // code varchar(100)
}, { timestamps: false })

export default mongoose.model('Subcategorymaster', SubcategorymasterSchema, 'subcategorymaster')
