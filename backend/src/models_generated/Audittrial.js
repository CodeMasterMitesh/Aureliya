import mongoose from 'mongoose'
const { Schema } = mongoose

const AudittrialSchema = new Schema({
  id: { type: Number }, // id int(11)
  msg: { type: String }, // msg text
  refid: { type: Number }, // refid int(11)
  reftable: { type: String }, // reftable varchar(100)
  eventtype: { type: String }, // eventtype varchar(100)
  datetime: { type: Date }, // datetime datetime
  uid: { type: Number }, // uid int(11)
  remarks: { type: String }, // remarks text
  version: { type: Number }, // version int(11)
  salsrno: { type: String }, // salsrno varchar(15)
  refsubid: { type: Number }, // refsubid int(11)
  refsubtable: { type: String }, // refsubtable varchar(50)
  company: { type: Number }, // company int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
}, { timestamps: false })

export default mongoose.model('Audittrial', AudittrialSchema, 'audittrial')
