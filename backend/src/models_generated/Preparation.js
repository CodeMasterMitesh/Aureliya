import mongoose from 'mongoose'
const { Schema } = mongoose

const PreparationSchema = new Schema({
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
  expdate: { type: String }, // expdate varchar(50)
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
  workingstanderno: { type: String }, // workingstanderno varchar(255)
  srno: { type: String }, // srno varchar(50)
  comapnyname: { type: String }, // comapnyname varchar(50)
  potency: { type: String }, // potency varchar(50)
  status: { type: String }, // status varchar(50)
  storagecondition: { type: String }, // storagecondition varchar(50)
  assaypotency: { type: String }, // assaypotency varchar(50)
  stdreceivingdate: { type: String }, // stdreceivingdate varchar(50)
  lodwater: { type: String }, // lodwater varchar(50)
  mfgdate: { type: String }, // mfgdate varchar(50)
  stock: { type: String }, // stock varchar(50)
  currentvial: { type: String }, // currentvial varchar(50)
  documentsatisfactory: { type: String }, // documentsatisfactory varchar(50)
  received: { type: String }, // received varchar(50)
  acceptedby: { type: String }, // acceptedby varchar(50)
  column46: { type: String }, // Column 46 varchar(50)
}, { timestamps: false })

export default mongoose.model('Preparation', PreparationSchema, 'preparation')
