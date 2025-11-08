import mongoose from 'mongoose'
const { Schema } = mongoose

const WorkorderSchema = new Schema({
  id: { type: Number }, // id int(11)
  pid: { type: Number }, // pid int(11)
  no: { type: String }, // no varchar(255)
  startdate: { type: Date }, // startdate date
  pono: { type: Number }, // pono int(11)
  salesno: { type: Number }, // salesno int(11)
  deliverydate: { type: Date }, // deliverydate date
  client: { type: String }, // client varchar(255)
  status: { type: String }, // status varchar(255)
  typeField: { type: String }, // type varchar(25)
  inhouseOuthouse: { type: String }, // inhouse/outhouse varchar(255)
  resource: { type: String }, // resource varchar(25)
  employee: { type: String }, // employee varchar(25)
  remark: { type: String }, // remark text
  process: { type: String }, // process varchar(255)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Workorder', WorkorderSchema, 'workorder')
