import mongoose from 'mongoose'
const { Schema } = mongoose

const ExpensesSchema = new Schema({
  id: { type: Number }, // id int(11)
  typeofexpenses: { type: String }, // typeofexpenses varchar(255)
  employeeid: { type: Number }, // employeeid int(11)
  expensesdate: { type: Date }, // expensesdate date
  description: { type: String }, // description varchar(255)
  remark: { type: String }, // remark varchar(255)
  amount: { type: String }, // amount varchar(255)
  status: { type: Number }, // status int(11)
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
  photo: { type: String }, // photo varchar(255)
  entrytype: { type: String }, // entrytype varchar(20)
  dailyallowance: { type: String }, // dailyallowance varchar(255)
  place: { type: String }, // place varchar(255)
  otherexpenses: { type: String }, // otherexpenses varchar(255)
  expensesamount: { type: String }, // expensesamount varchar(255)
  localconveyance: { type: String }, // localconveyance varchar(255)
  hotelexpenses: { type: String }, // hotelexpenses varchar(255)
  travelfare: { type: String }, // travelfare varchar(255)
  photo2: { type: String }, // photo2 varchar(255)
  photo3: { type: String }, // photo3 varchar(255)
  photo4: { type: String }, // photo4 varchar(255)
  photo5: { type: String }, // photo5 varchar(255)
  photo6: { type: String }, // photo6 varchar(255)
  photo7: { type: String }, // photo7 varchar(255)
  photo8: { type: String }, // photo8 varchar(255)
  photo9: { type: String }, // photo9 varchar(255)
  photo10: { type: String }, // photo10 varchar(255)
  activitytype: { type: String }, // activitytype varchar(150)
  approved: { type: String }, // approved varchar(45)
  requestfor: { type: String }, // requestfor varchar(45)
  lat: { type: Number }, // lat double
  lng: { type: Number }, // lng double
  requestby: { type: Number }, // requestby int(11)
  approved2: { type: String }, // approved2 varchar(20)
  managerremarks: { type: String }, // managerremarks varchar(255)
  approvedby: { type: Number }, // approvedby int(11)
  approved2by: { type: Number }, // approved2by int(11)
  km: { type: Number }, // km float
}, { timestamps: false })

export default mongoose.model('Expenses', ExpensesSchema, 'expenses')
