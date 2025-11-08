import mongoose from 'mongoose'
const { Schema } = mongoose

const MaterialreturnSchema = new Schema({
  id: { type: Number }, // id int(11)
  materialreturnno: { type: String }, // materialreturnno varchar(25)
  returndatetime: { type: Date }, // returndatetime datetime
  customerid: { type: Number }, // customerid int(11)
  area: { type: String }, // area varchar(255)
  state: { type: String }, // state varchar(100)
  mobile: { type: String }, // mobile varchar(100)
  dispatchdetails: { type: String }, // dispatchdetails varchar(100)
  customermobile: { type: String }, // customermobile varchar(255)
  customeremail: { type: String }, // customeremail varchar(255)
  returnby: { type: Number }, // returnby int(11)
  remarks: { type: String }, // remarks text
  purpose: { type: String }, // purpose enum('Sale'
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  company: { type: Number }, // company int(11)
  active: { type: Number }, // active int(11)
  deleteField: { type: Number }, // delete int(11)
  views: { type: Number }, // views int(11)
  lock: { type: Number }, // lock int(11)
  branch: { type: Number }, // branch int(11)
  action: { type: String }, // action varchar(25)
  entrytype: { type: String }, // entrytype varchar(20)
  approved: { type: String }, // approved varchar(20)
  costcenter: { type: Number }, // costcenter int(11)
  attachment: { type: String }, // attachment varchar(200)
  godown: { type: Number }, // godown int(11)
  employeeid: { type: Number }, // employeeid int(11)
  managerid: { type: Number }, // managerid int(11)
  stage: { type: String }, // stage varchar(50)
  instrumentsrno: { type: String }, // instrumentsrno varchar(255)
  instrumentstatus: { type: String }, // instrumentstatus varchar(255)
  issueno: { type: Number }, // issueno int(11)
}, { timestamps: false })

export default mongoose.model('Materialreturn', MaterialreturnSchema, 'materialreturn')
