import mongoose from 'mongoose'
const { Schema } = mongoose

const InstrumentsSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  code: { type: String }, // code varchar(25)
  specification: { type: String }, // specification varchar(255)
  manufacturer: { type: String }, // manufacturer varchar(255)
  modelname: { type: String }, // modelname varchar(25)
  relatedsop: { type: String }, // relatedsop varchar(255)
  reference: { type: String }, // reference varchar(255)
  dateofcalibration: { type: Date }, // dateofcalibration date
  location: { type: String }, // location varchar(255)
  purchasedate: { type: Date }, // purchasedate date
  lastservicedate: { type: Date }, // lastservicedate date
  serviceduedate: { type: Date }, // serviceduedate date
  lastcalibration: { type: String }, // lastcalibration varchar(25)
  calibrationduedate: { type: Date }, // calibrationduedate date
  instrumentsid: { type: String }, // instrumentsid varchar(20)
  serialnumber: { type: String }, // serialnumber varchar(20)
  suppliedby: { type: String }, // suppliedby varchar(100)
  calibration: { type: String }, // calibration varchar(100)
  calibrationfrequency: { type: String }, // calibrationfrequency varchar(100)
  calibrationtype: { type: String }, // calibrationtype varchar(100)
  calibrationyear: { type: String }, // calibrationyear varchar(100)
  calibrationdonedate: { type: Date }, // calibrationdonedate date
  performedby: { type: String }, // performedby varchar(100)
  maintenancecontract: { type: String }, // maintenancecontract varchar(100)
  periodfromdate: { type: Date }, // periodfromdate date
  periodtodate: { type: Date }, // periodtodate date
  preventivedonedate: { type: Date }, // preventivedonedate date
  preventivedduedate: { type: Date }, // preventivedduedate date
  calibrationdue: { type: String }, // calibrationdue varchar(20)
  calibrationdone: { type: String }, // calibrationdone varchar(20)
  periodfrom: { type: String }, // periodfrom varchar(20)
  periodto: { type: String }, // periodto varchar(20)
  preventivedone: { type: String }, // preventivedone varchar(20)
  preventivedue: { type: String }, // preventivedue varchar(20)
  company: { type: Number }, // company int(11)
  foldername: { type: String }, // foldername varchar(20)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  instrumentstype: { type: String }, // instrumentstype varchar(10)
  header: { type: String }, // header varchar(100)
  branch: { type: Number }, // branch int(11)
  enterby: { type: Number }, // enterby int(11)
  instrumenttypeid: { type: Number }, // instrumenttypeid int(11)
  intermediateqcdate: { type: Date }, // intermediateqcdate date
  intermediateqcdone: { type: String }, // intermediateqcdone varchar(50)
  intermediateqcduedate: { type: Date }, // intermediateqcduedate date
  intermediateqcdue: { type: String }, // intermediateqcdue varchar(50)
}, { timestamps: false })

export default mongoose.model('Instruments', InstrumentsSchema, 'instruments')
