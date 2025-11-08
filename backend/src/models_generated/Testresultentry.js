import mongoose from 'mongoose'
const { Schema } = mongoose

const TestresultentrySchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  studyid: { type: Number }, // studyid int(11)
  testid: { type: Number }, // testid int(11)
  date: { type: Date }, // date date
  testresult: { type: String }, // testresult varchar(255)
  observations: { type: String }, // observations varchar(255)
}, { timestamps: false })

export default mongoose.model('Testresultentry', TestresultentrySchema, 'testresultentry')
