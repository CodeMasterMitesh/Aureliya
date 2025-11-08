import mongoose from 'mongoose'
const { Schema } = mongoose

const VolumetricsolutionsSchema = new Schema({
  id: { type: Number }, // id int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  name: { type: String }, // name varchar(100)
  number: { type: String }, // number varchar(100)
  lotno: { type: String }, // lotno varchar(100)
  preparationdate: { type: Date }, // preparationdate date
  usebeforedate: { type: Date }, // usebeforedate date
  tvolume: { type: Number }, // tvolume float
  procedure: { type: String }, // procedure text
  preparedby: { type: Number }, // preparedby int(11)
  checkedby: { type: Number }, // checkedby int(11)
  typeField: { type: String }, // type varchar(100)
  name1: { type: String }, // name1 varchar(255)
  lotNo: { type: String }, // lot_no varchar(100)
  formula: { type: String }, // formula varchar(100)
  molWeight: { type: Number }, // mol_weight float
  effectiveDate: { type: Date }, // effective_date date
  validUpTo: { type: String }, // valid_up_to varchar(100)
  image: { type: String }, // image varchar(100)
  storage: { type: String }, // storage varchar(300)
  instruction: { type: String }, // instruction varchar(300)
  bookingno: { type: String }, // bookingno varchar(255)
  instructions: { type: String }, // instructions varchar(255)
}, { timestamps: false })

export default mongoose.model('Volumetricsolutions', VolumetricsolutionsSchema, 'volumetricsolutions')
