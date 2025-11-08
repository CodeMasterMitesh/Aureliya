import mongoose from 'mongoose'
const { Schema } = mongoose

const CategorymasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  product: { type: String }, // product varchar(100)
  parent: { type: Number }, // parent int(11)
  image: { type: String }, // image varchar(255)
  sort: { type: Number }, // sort int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  barnch: { type: Number }, // barnch int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
}, { timestamps: false })

export default mongoose.model('Categorymaster', CategorymasterSchema, 'categorymaster')
