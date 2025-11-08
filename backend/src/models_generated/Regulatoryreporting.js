import mongoose from 'mongoose'
const { Schema } = mongoose

const RegulatoryreportingSchema = new Schema({
  id: { type: Number }, // id int(11)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  caseid: { type: String }, // caseid varchar(50)
  regulatoryAuthorityId: { type: Number }, // regulatory_authority_id int(11)
  submissionStatus: { type: String }, // submission_status varchar(100)
  comments: { type: String }, // comments varchar(255)
  submissionDate: { type: Date }, // submission_date date
  reportType: { type: String }, // report_type varchar(100)
}, { timestamps: false })

export default mongoose.model('Regulatoryreporting', RegulatoryreportingSchema, 'regulatoryreporting')
