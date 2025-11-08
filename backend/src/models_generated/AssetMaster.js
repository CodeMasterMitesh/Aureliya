import mongoose from 'mongoose'
const { Schema } = mongoose

const AssetMasterSchema = new Schema({
  id: { type: Number }, // id bigint(20)
  name: { type: String }, // name varchar(255)
  code: { type: String }, // code varchar(255)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime timestamp
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime timestamp
  deleteField: { type: Boolean }, // delete tinyint(1)
  active: { type: Boolean }, // active tinyint(1)
  sort: { type: Number }, // sort int(11)
  ledgerid: { type: Number }, // ledgerid int(11)
  srno: { type: Number }, // srno int(11)
  purchasedate: { type: Date }, // purchasedate datetime
  purchaseAmount: { type: Number }, // purchase_amount decimal(10
  remarks: { type: String }, // remarks text
  attachment1: { type: Buffer }, // attachment1 longblob
  attachment2: { type: Buffer }, // attachment2 longblob
  attachment3: { type: Buffer }, // attachment3 longblob
  attachment4: { type: Buffer }, // attachment4 longblob
}, { timestamps: false })

export default mongoose.model('AssetMaster', AssetMasterSchema, 'asset_master')
