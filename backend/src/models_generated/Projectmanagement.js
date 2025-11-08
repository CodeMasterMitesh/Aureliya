import mongoose from 'mongoose'
const { Schema } = mongoose

const ProjectmanagementSchema = new Schema({
  id: { type: Number }, // id int(11)
  projectid: { type: Number }, // projectid int(11)
  employeeid: { type: Number }, // employeeid int(11)
  startdate: { type: Date }, // startdate date
  enddate: { type: Date }, // enddate date
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  name: { type: String }, // name varchar(255)
  budget: { type: String }, // budget varchar(255)
  objectives: { type: String }, // objectives varchar(255)
  image1: { type: String }, // image1 varchar(100)
  image2: { type: String }, // image2 varchar(100)
  image3: { type: String }, // image3 varchar(100)
  image4: { type: String }, // image4 varchar(100)
}, { timestamps: false })

export default mongoose.model('Projectmanagement', ProjectmanagementSchema, 'projectmanagement')
