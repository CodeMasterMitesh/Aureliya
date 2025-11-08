import mongoose from 'mongoose'
const { Schema } = mongoose

const ProductionEntrySchema = new Schema({
  id: { type: Number }, // id int(11)
  process: { type: String }, // process varchar(255)
  product: { type: String }, // product varchar(255)
  min: { type: String }, // min varchar(255)
  salesorder: { type: String }, // salesorder varchar(255)
  employeeJobwork: { type: String }, // employee_jobwork varchar(255)
  targetDate: { type: Date }, // target_date date
  rateDozen: { type: String }, // rate_dozen varchar(255)
}, { timestamps: false })

export default mongoose.model('ProductionEntry', ProductionEntrySchema, 'production_entry')
