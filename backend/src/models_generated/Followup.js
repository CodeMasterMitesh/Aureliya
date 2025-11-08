import mongoose from 'mongoose'
const { Schema } = mongoose

const FollowupSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  lock: { type: Number }, // lock int(11)
  active: { type: Number }, // active int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  leadid: { type: Number }, // leadid int(11)
  followuptype: { type: String }, // followuptype varchar(15)
  datetime: { type: Date }, // datetime datetime
  nextfollowupafterdays: { type: Number }, // nextfollowupafterdays int(11)
  status: { type: String }, // status varchar(50)
  customervoice: { type: String }, // customervoice varchar(255)
  actiontaken: { type: String }, // actiontaken varchar(255)
  branch: { type: Number }, // branch int(11)
  company: { type: Number }, // company int(11)
  action: { type: String }, // action varchar(25)
  followupdate: { type: Date }, // followupdate date
  reason: { type: String }, // reason varchar(150)
  priority: { type: String }, // priority varchar(10)
  approval: { type: String }, // approval varchar(25)
  last: { type: Number }, // last int(11)
}, { timestamps: false })

export default mongoose.model('Followup', FollowupSchema, 'followup')
