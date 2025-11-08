import mongoose from 'mongoose'
const { Schema } = mongoose

const PmitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  customerpmId: { type: Number }, // customerpm_id int(11)
  days: { type: String }, // days text
  remarks: { type: String }, // remarks text
  pmNo: { type: Number }, // pm_no int(11)
  date: { type: Date }, // date date
  status: { type: String }, // status varchar(20)
  pmId: { type: Number }, // pm_id int(11)
}, { timestamps: false })

export default mongoose.model('Pmitems', PmitemsSchema, 'pmitems')
