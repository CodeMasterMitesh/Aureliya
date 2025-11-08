import mongoose from 'mongoose'
const { Schema } = mongoose

const VacanciesSchema = new Schema({
  id: { type: Number }, // id int(11)
  name: { type: String }, // name varchar(255)
  departmentid: { type: Number }, // departmentid int(11)
  positionPostingDate: { type: Date }, // position_posting_date date
  position: { type: String }, // position varchar(255)
  positionFilledDate: { type: Date }, // position_filled_date date
  positionStartDate: { type: Date }, // position_start_date date
  status: { type: String }, // status varchar(50)
  description: { type: String }, // description text
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifiedbydatetime: { type: Date }, // modifiedbydatetime datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  positionId: { type: Number }, // position_id int(11)
  recruitmentName: { type: String }, // recruitment_name varchar(255)
  recruitmentCode: { type: String }, // recruitment_code varchar(255)
  applicationsummary: { type: String }, // applicationsummary varchar(255)
  workStartDate: { type: Date }, // work_start_date date
  availability: { type: String }, // availability varchar(50)
  proposedSalary: { type: String }, // proposed_salary varchar(50)
}, { timestamps: false })

export default mongoose.model('Vacancies', VacanciesSchema, 'vacancies')
