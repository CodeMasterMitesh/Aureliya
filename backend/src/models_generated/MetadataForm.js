import mongoose from 'mongoose'
const { Schema } = mongoose

const MetadataFormSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  isadd: { type: Boolean }, // isadd tinyint(1)
  isedit: { type: Boolean }, // isedit tinyint(1)
  isview: { type: Boolean }, // isview tinyint(1)
  primarytable: { type: String }, // primarytable varchar(50)
  secondarytable: { type: String }, // secondarytable varchar(255)
}, { timestamps: false })

export default mongoose.model('MetadataForm', MetadataFormSchema, 'metadata_form')
