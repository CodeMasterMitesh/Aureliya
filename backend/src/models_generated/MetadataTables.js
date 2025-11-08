import mongoose from 'mongoose'
const { Schema } = mongoose

const MetadataTablesSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(50)
  typeField: { type: String }, // type varchar(15)
  moduleid: { type: Number }, // moduleid int(11)
}, { timestamps: false })

export default mongoose.model('MetadataTables', MetadataTablesSchema, 'metadata_tables')
