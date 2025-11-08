import mongoose from 'mongoose'
const { Schema } = mongoose

const MetadataColumnSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(50)
  table: { type: String }, // table varchar(25)
  typeField: { type: String }, // type varchar(15)
  length: { type: Number }, // length int(11)
  defaultvalue: { type: String }, // defaultvalue varchar(100)
  index: { type: String }, // index varchar(50)
  autoincrement: { type: String }, // autoincrement varchar(20)
  comment: { type: String }, // comment varchar(100)
  fktable: { type: String }, // fktable varchar(255)
  fkcolumn: { type: String }, // fkcolumn varchar(255)
  elementtype: { type: String }, // elementtype varchar(20)
  elementclass: { type: String }, // elementclass varchar(255)
  elementstyle: { type: String }, // elementstyle text
  isautocomplete: { type: Boolean }, // isautocomplete tinyint(1)
  autocompletetable: { type: String }, // autocompletetable varchar(50)
  autocompletecoloum: { type: String }, // autocompletecoloum varchar(50)
  condition: { type: String }, // condition varchar(255)
  autocompletelimit: { type: String }, // autocompletelimit varchar(30)
  textarearows: { type: String }, // textarearows varchar(20)
  textareacoloums: { type: String }, // textareacoloums varchar(20)
  wyswyg: { type: Boolean }, // wyswyg tinyint(1)
  ismultiple: { type: Boolean }, // ismultiple tinyint(1)
  selecttable: { type: String }, // selecttable varchar(25)
  value: { type: String }, // value varchar(25)
  text: { type: String }, // text varchar(25)
  manualvalue: { type: String }, // manualvalue text
  manualtext: { type: String }, // manualtext text
  isrequired: { type: Boolean }, // isrequired tinyint(1)
  validation: { type: String }, // validation varchar(255)
  componentid: { type: Number }, // componentid int(11)
  sort: { type: Number }, // sort int(11)
}, { timestamps: false })

export default mongoose.model('MetadataColumn', MetadataColumnSchema, 'metadata_column')
