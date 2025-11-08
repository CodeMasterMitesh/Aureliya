import mongoose from 'mongoose'
const { Schema } = mongoose

const PostLaunchSchema = new Schema({
  id: { type: Number }, // id int(11)
  projectId: { type: Number }, // project_id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  authoId: { type: Number }, // autho_id int(11)
  launchDate: { type: Date }, // launch_date date
  launchStatus: { type: String }, // launch_status varchar(100)
  marketingStrategy: { type: String }, // marketing_strategy text
  comments: { type: String }, // comments text
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  bomId: { type: Number }, // bom_id int(11)
  itemId: { type: Number }, // item_id int(11)
  market: { type: String }, // market varchar(255)
  status: { type: String }, // status varchar(30)
}, { timestamps: false })

export default mongoose.model('PostLaunch', PostLaunchSchema, 'post_launch')
