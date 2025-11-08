import mongoose from 'mongoose'
const { Schema } = mongoose

const EinvoiceRequestSchema = new Schema({
  id: { type: Number }, // id int(11)
  salesid: { type: Number }, // salesid int(11)
  headers: { type: String }, // headers text
  request: { type: String }, // request text
  response: { type: String }, // response text
  datetime: { type: Date }, // datetime datetime
  typeField: { type: String }, // type varchar(150)
  requestid: { type: String }, // requestid varchar(150)
  ackno: { type: String }, // AckNo varchar(150)
  ackdt: { type: String }, // AckDt varchar(255)
  irn: { type: String }, // Irn varchar(255)
  signedinvoice: { type: String }, // SignedInvoice text
  signedqrcode: { type: String }, // SignedQRCode text
  status: { type: String }, // Status varchar(255)
  ewbno: { type: String }, // EwbNo varchar(255)
  ewbdt: { type: String }, // EwbDt varchar(255)
  ewbvalidtill: { type: String }, // EwbValidTill varchar(255)
  requestIrn: { type: String }, // request_irn varchar(255)
  requestEwaybill: { type: String }, // request_ewaybill varchar(255)
  requestPdf: { type: String }, // request_pdf varchar(255)
  mode: { type: String }, // mode varchar(255)
  othersalesid: { type: Number }, // othersalesid int(11)
}, { timestamps: false })

export default mongoose.model('EinvoiceRequest', EinvoiceRequestSchema, 'einvoice_request')
