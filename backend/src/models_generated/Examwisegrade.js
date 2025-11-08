import mongoose from 'mongoose'
const { Schema } = mongoose

const ExamwisegradeSchema = new Schema({
  id: { type: Number }, // id int(11)
  examid: { type: Number }, // examid int(11)
  description: { type: String }, // description varchar(255)
  company: { type: Number }, // company int(11)
  branch: { type: Number }, // branch int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  action: { type: String }, // action varchar(15)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  batch: { type: Number }, // batch int(11)
  min: { type: String }, // min varchar(255)
  max: { type: String }, // max varchar(255)
  grade: { type: String }, // grade varchar(255)
}, { timestamps: false })

export default mongoose.model('Examwisegrade', ExamwisegradeSchema, 'examwisegrade')
