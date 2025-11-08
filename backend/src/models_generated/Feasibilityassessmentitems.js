import mongoose from 'mongoose'
const { Schema } = mongoose

const FeasibilityassessmentitemsSchema = new Schema({
  id: { type: Number }, // id int(11)
  feasibilityid: { type: Number }, // feasibilityid int(11)
  name: { type: String }, // name varchar(255)
  attach: { type: String }, // attach text
  img: { type: String }, // img varchar(255)
  remarks: { type: String }, // remarks varchar(255)
}, { timestamps: false })

export default mongoose.model('Feasibilityassessmentitems', FeasibilityassessmentitemsSchema, 'feasibilityassessmentitems')
