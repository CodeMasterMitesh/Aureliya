import mongoose from 'mongoose'
const { Schema } = mongoose

const SpecificationmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  name: { type: String }, // name varchar(255)
  productid: { type: Number }, // productid int(11)
  testid: { type: Number }, // testid int(11)
  specification: { type: String }, // specification varchar(255)
  acceptancecriteria: { type: String }, // acceptancecriteria varchar(255)
}, { timestamps: false })

export default mongoose.model('Specificationmaster', SpecificationmasterSchema, 'specificationmaster')
