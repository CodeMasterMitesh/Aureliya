import mongoose from 'mongoose'
const { Schema } = mongoose

const CvSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  departmentid: { type: Number }, // departmentid int(11)
  positionPostingDate: { type: Date }, // position_posting_date date
  position: { type: String }, // position varchar(255)
  positionFilledDate: { type: Date }, // position_filled_date date
  positionStartDate: { type: Date }, // position_start_date date
  status: { type: String }, // status varchar(50)
  description: { type: String }, // description text
  code: { type: String }, // code varchar(255)
  availability: { type: String }, // availability varchar(255)
  proposedSalary: { type: String }, // proposed_salary varchar(255)
  attachment: { type: String }, // attachment varchar(255)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  active: { type: Number }, // active int(11)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  image: { type: String }, // image text
  email: { type: String }, // email varchar(255)
  phone: { type: String }, // phone varchar(25)
  city: { type: String }, // city varchar(255)
  resume: { type: String }, // resume text
  postname: { type: String }, // postname varchar(25)
  vacancyid: { type: Number }, // vacancyid int(11)
  read: { type: Number }, // read int(11)
  approveddatetime: { type: Date }, // approveddatetime datetime
  recid: { type: Number }, // recid int(11)
  date: { type: Date }, // date date
  details: { type: String }, // details varchar(255)
}, { timestamps: false })

export default mongoose.model('Cv', CvSchema, 'cv')
