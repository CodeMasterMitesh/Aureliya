import mongoose from 'mongoose'
const { Schema } = mongoose

const AdverseeventSchema = new Schema({
  id: { type: Number }, // id int(11)
  patientInformation: { type: String }, // patient_information text
  suspectedDrugs: { type: String }, // suspected_drugs text
  adverseEventDescription: { type: String }, // adverse_event_description text
  onsetDate: { type: Date }, // onset_date date
  outcome: { type: String }, // outcome text
  reporterDetails: { type: String }, // reporter_details text
  seriousnessCriteria: { type: String }, // seriousness_criteria enum('death'
  actionsTaken: { type: String }, // actions_taken text
  enterby: { type: Number }, // enterby int(11)
  company: { type: Number }, // company int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
}, { timestamps: false })

export default mongoose.model('Adverseevent', AdverseeventSchema, 'adverseevent')
