import mongoose from 'mongoose'
const { Schema } = mongoose

const ChromatographyconditionSchema = new Schema({
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
  chromatographyconditiondate: { type: Date }, // chromatographyconditiondate date
  usebeforedate: { type: Date }, // usebeforedate date
  tvolume: { type: Number }, // tvolume float
  procedure: { type: String }, // procedure text
  preparedby: { type: Number }, // preparedby int(11)
  checkedby: { type: Number }, // checkedby int(11)
  typeField: { type: String }, // type varchar(100)
  bookingid: { type: Number }, // bookingid int(11)
  bookingtestid: { type: Number }, // bookingtestid int(11)
  column: { type: String }, // column varchar(50)
  columnid: { type: String }, // columnid varchar(50)
  flowrate: { type: String }, // flowrate varchar(50)
  runtim: { type: String }, // runtim varchar(50)
  oventemp: { type: String }, // oventemp varchar(50)
  wavelength: { type: String }, // wavelength varchar(50)
  injvol: { type: String }, // injvol varchar(50)
  samplecooler: { type: String }, // samplecooler varchar(50)
  testname: { type: String }, // testname varchar(50)
  action: { type: String }, // action varchar(50)
  date: { type: Date }, // date date
  reffrom: { type: String }, // reffrom varchar(255)
  pharmacopoeia: { type: String }, // pharmacopoeia enum('IP'
  chromatography: { type: String }, // chromatography varchar(100)
  detectorwavelength: { type: String }, // detectorwavelength varchar(100)
  injectionvolume: { type: String }, // injectionvolume varchar(50)
  columnoventemp: { type: String }, // columnoventemp varchar(50)
  retentiontime: { type: String }, // retentiontime varchar(50)
  detector: { type: String }, // detector varchar(100)
  carriergas: { type: String }, // carriergas varchar(100)
  makeupgas: { type: String }, // makeupgas varchar(100)
  flowmode: { type: String }, // flowmode varchar(100)
  flow: { type: String }, // flow varchar(50)
  constanttemperature: { type: String }, // constanttemperature varchar(50)
  injectiontemperature: { type: String }, // injectiontemperature varchar(50)
  detectortemperature: { type: String }, // detectortemperature varchar(50)
  inletseptumpurgeflow: { type: String }, // inletseptumpurgeflow varchar(50)
  hydrogenflow: { type: String }, // hydrogenflow varchar(50)
  zeroairflow: { type: String }, // zeroairflow varchar(50)
  makeupnitrogenflow: { type: String }, // makeupnitrogenflow varchar(50)
  splitflow: { type: String }, // splitflow varchar(50)
  columntemperature: { type: String }, // columntemperature varchar(100)
  makeupflow: { type: String }, // makeupflow varchar(50)
  runtm: { type: String }, // runtm varchar(50)
  pressureequilibrationtm: { type: String }, // pressureequilibrationtm varchar(50)
  auxpressure: { type: String }, // auxpressure varchar(50)
  vialequilibrationtm: { type: String }, // vialequilibrationtm varchar(50)
  transferlinetemperature: { type: String }, // transferlinetemperature varchar(50)
  manifoldtemperature: { type: String }, // manifoldtemperature varchar(50)
  oventemperature: { type: String }, // oventemperature varchar(50)
  gccycletm: { type: String }, // gccycletm varchar(50)
  retentiontm: { type: String }, // retentiontm varchar(50)
}, { timestamps: false })

export default mongoose.model('Chromatographycondition', ChromatographyconditionSchema, 'chromatographycondition')
