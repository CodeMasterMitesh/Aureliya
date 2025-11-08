import mongoose from 'mongoose'
const { Schema } = mongoose

const RiskmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  drugInformation: { type: String }, // drug_information varchar(100)
  identifiedRisks: { type: String }, // identified_risks varchar(100)
  mitigationMeasures: { type: String }, // mitigation_measures varchar(100)
  monitoringPlan: { type: String }, // monitoring_plan varchar(50)
  reviewDate: { type: Date }, // review_date date
}, { timestamps: false })

export default mongoose.model('Riskmanagement', RiskmanagementSchema, 'riskmanagement')
