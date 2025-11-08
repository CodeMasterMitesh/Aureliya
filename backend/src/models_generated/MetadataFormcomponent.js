import mongoose from 'mongoose'
const { Schema } = mongoose

const MetadataFormcomponentSchema = new Schema({
  id: { type: Number }, // id int(11)
  typeField: { type: String }, // type varchar(50)
  formid: { type: Number }, // formid int(11)
  parentcomponent: { type: Number }, // parentcomponent int(11)
  sort: { type: Number }, // sort int(11)
}, { timestamps: false })

export default mongoose.model('MetadataFormcomponent', MetadataFormcomponentSchema, 'metadata_formcomponent')
