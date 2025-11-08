import mongoose from 'mongoose'
const { Schema } = mongoose

const CustomerproductmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  customerid: { type: Number }, // customerid int(11)
  instrument: { type: Number }, // instrument int(11)
  instrumentSerialNo: { type: String }, // instrument_serial_no varchar(255)
  dateOfInstallation: { type: Date }, // date_of_installation date
  fileNo: { type: String }, // file_no varchar(255)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  labid: { type: Number }, // labid int(11)
  warrantyatdate: { type: Date }, // warrantyatdate date
  remarks: { type: String }, // remarks varchar(255)
  noofvisit: { type: Number }, // noofvisit int(11)
  totalProduct: { type: Number }, // total_product float
  oemInstallationDate: { type: Date }, // oem_installation_date date
  oemWarrantyDate: { type: Date }, // oem_Warranty_date date
}, { timestamps: false })

export default mongoose.model('Customerproductmaster', CustomerproductmasterSchema, 'customerproductmaster')
