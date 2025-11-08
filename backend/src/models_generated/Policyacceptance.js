import mongoose from 'mongoose'
const { Schema } = mongoose

const PolicyacceptanceSchema = new Schema({
  id: { type: Number }, // id int(11)
  userid: { type: Number }, // userid int(11)
  policyid: { type: Number }, // policyid int(11)
  acceptedAt: { type: Date }, // accepted_at datetime
}, { timestamps: false })

export default mongoose.model('Policyacceptance', PolicyacceptanceSchema, 'policyacceptance')
