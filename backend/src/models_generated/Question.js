import mongoose from 'mongoose'
const { Schema } = mongoose

const QuestionSchema = new Schema({
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  name: { type: String }, // name varchar(50)
  typeField: { type: String }, // type varchar(50)
  sort: { type: Number }, // sort int(11)
  option1: { type: String }, // option1 varchar(50)
  option2: { type: String }, // option2 varchar(50)
  option3: { type: String }, // option3 varchar(50)
  option4: { type: String }, // option4 varchar(50)
  option5: { type: String }, // option5 varchar(50)
  option6: { type: String }, // option6 varchar(50)
  option7: { type: String }, // option7 varchar(50)
  option8: { type: String }, // option8 varchar(50)
  option9: { type: String }, // option9 varchar(50)
  option10: { type: String }, // option10 varchar(50)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  id: { type: Number }, // id int(11)
}, { timestamps: false })

export default mongoose.model('Question', QuestionSchema, 'question')
