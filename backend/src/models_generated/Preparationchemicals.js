import mongoose from 'mongoose'
const { Schema } = mongoose

const PreparationchemicalsSchema = new Schema({
  id: { type: Number }, // id int(11)
  preparationid: { type: Number }, // preparationid int(11)
  chemicalid: { type: Number }, // chemicalid int(11)
  batchno: { type: String }, // batchno varchar(100)
  usebeforedate: { type: Date }, // usebeforedate date
  qty: { type: String }, // qty varchar(255)
  analysissrno: { type: String }, // analysissrno varchar(255)
  analysistest: { type: String }, // analysistest varchar(255)
  analysisspecification: { type: String }, // analysisspecification varchar(255)
  remarks: { type: String }, // remarks varchar(255)
  sampleqty: { type: Number }, // sampleqty float
}, { timestamps: false })

export default mongoose.model('Preparationchemicals', PreparationchemicalsSchema, 'preparationchemicals')
