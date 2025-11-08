import mongoose from 'mongoose'
const { Schema } = mongoose

const PerformanceSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  reviewdate: { type: Date }, // reviewdate date
  period: { type: String }, // period varchar(255)
  overallperformance: { type: String }, // overallperformance varchar(255)
  productivity: { type: String }, // productivity varchar(255)
  jobknowledge: { type: String }, // jobknowledge varchar(255)
}, { timestamps: false })

export default mongoose.model('Performance', PerformanceSchema, 'performance')
