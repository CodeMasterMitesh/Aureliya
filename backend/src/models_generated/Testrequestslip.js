import mongoose from 'mongoose'
const { Schema } = mongoose

const TestrequestslipSchema = new Schema({
  id: { type: Number }, // id int(11)
  clientid: { type: Number }, // clientid int(11)
  date: { type: Date }, // date date
  enterby: { type: Number }, // enterby int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  companyaddress: { type: String }, // companyaddress varchar(50)
  mfglicno: { type: String }, // mfglicno varchar(50)
  mail: { type: String }, // mail varchar(50)
  contactno: { type: String }, // contactno varchar(50)
  contactperson: { type: String }, // contactperson varchar(50)
  manufactureby: { type: Number }, // manufactureby int(11)
}, { timestamps: false })

export default mongoose.model('Testrequestslip', TestrequestslipSchema, 'testrequestslip')
