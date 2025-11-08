import mongoose from 'mongoose'
const { Schema } = mongoose

const SamplereceiptattSchema = new Schema({
  id: { type: Number }, // id int(11)
  samplereceiptid: { type: Number }, // samplereceiptid int(11)
  filename: { type: String }, // filename varchar(255)
  document: { type: String }, // document varchar(255)
}, { timestamps: false })

export default mongoose.model('Samplereceiptatt', SamplereceiptattSchema, 'samplereceiptatt')
