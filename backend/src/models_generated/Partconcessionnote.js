import mongoose from 'mongoose'
const { Schema } = mongoose

const PartconcessionnoteSchema = new Schema({
  id: { type: Number }, // id int(11)
  pcnno: { type: String }, // pcnno varchar(25)
  projectcode: { type: String }, // projectcode varchar(25)
  pid: { type: Number }, // pid int(11)
  date: { type: Date }, // date date
  drgdocno: { type: String }, // drgdocno varchar(25)
  revno: { type: String }, // revno varchar(25)
  sheetno: { type: String }, // sheetno varchar(25)
  pono: { type: Number }, // pono int(11)
  lotbatchsize: { type: String }, // lotbatchsize varchar(25)
  podate: { type: Date }, // podate date
  vendorname: { type: String }, // vendorname varchar(25)
  vendorcode: { type: String }, // vendorcode varchar(25)
  vendorrating: { type: String }, // vendorrating varchar(25)
  typeofconcession: { type: String }, // typeofconcession varchar(255)
  levelofseverity: { type: String }, // levelofseverity varchar(255)
  corrective: { type: String }, // corrective varchar(255)
  initiatorname: { type: String }, // initiatorname varchar(255)
  designation: { type: String }, // designation varchar(255)
  idate: { type: Date }, // idate date
  initiatordept: { type: String }, // initiatordept varchar(255)
  deptheadname: { type: String }, // deptheadname varchar(255)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  approved: { type: Number }, // approved int(11)
  supplierstate: { type: String }, // supplierstate varchar(50)
}, { timestamps: false })

export default mongoose.model('Partconcessionnote', PartconcessionnoteSchema, 'partconcessionnote')
