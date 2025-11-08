import mongoose from 'mongoose'
const { Schema } = mongoose

const StandardpreparationSchema = new Schema({
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  name: { type: String }, // name varchar(100)
  testname: { type: String }, // testname varchar(100)
  number: { type: String }, // number varchar(100)
  lotno: { type: String }, // lotno varchar(100)
  standardpreparationdate: { type: Date }, // standardpreparationdate date
  usebeforedate: { type: Date }, // usebeforedate date
  date: { type: Date }, // date date
  tvolume: { type: Number }, // tvolume float
  procedure: { type: String }, // procedure text
  preparedby: { type: Number }, // preparedby int(11)
  checkedby: { type: Number }, // checkedby int(11)
  typeField: { type: String }, // type varchar(100)
  bookingid: { type: Number }, // bookingid int(11)
  bookingtestid: { type: Number }, // bookingtestid int(11)
  takenweight: { type: Number }, // takenweight float
  avgweight: { type: Number }, // avgweight float
  volume: { type: Number }, // volume float
  totalconcentration: { type: Number }, // totalconcentration float
  id: { type: Number }, // id int(11)
  action: { type: String }, // action varchar(50)
  drugname: { type: String }, // drugname varchar(50)
  workingstandard: { type: Number }, // workingstandard int(11)
  labelclimb: { type: String }, // labelclimb varchar(50)
  diluent: { type: String }, // diluent varchar(50)
  refform: { type: String }, // refform varchar(50)
  preparationvial: { type: Number }, // preparationvial int(11)
  vialQty: { type: Number }, // vial_qty int(11)
  vialUnit: { type: String }, // vial_unit varchar(50)
  potency: { type: String }, // potency varchar(50)
  assay: { type: String }, // assay varchar(50)
  lodwater: { type: String }, // lodwater varchar(50)
  attachment: { type: String }, // Attachment varchar(255)
  weightprintattachment: { type: String }, // weightprintattachment varchar(255)
  phprintattachment: { type: String }, // phprintattachment varchar(255)
}, { timestamps: false })

export default mongoose.model('Standardpreparation', StandardpreparationSchema, 'standardpreparation')
