import mongoose from 'mongoose'
const { Schema } = mongoose

const AssaySchema = new Schema({
  id: { type: Number }, // id int(11)
  noofstandard: { type: String }, // noofstandard varchar(50)
  nooftest: { type: String }, // nooftest varchar(50)
  bookingno: { type: String }, // bookingno varchar(50)
}, { timestamps: false })

export default mongoose.model('Assay', AssaySchema, 'assay')
