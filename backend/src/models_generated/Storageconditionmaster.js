import mongoose from 'mongoose'
const { Schema } = mongoose

const StorageconditionmasterSchema = new Schema({
  id: { type: Number }, // id int(11)
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  name: { type: String }, // name varchar(255)
  temperaturerange: { type: String }, // temperaturerange varchar(255)
  humidityrange: { type: String }, // humidityrange varchar(255)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
}, { timestamps: false })

export default mongoose.model('Storageconditionmaster', StorageconditionmasterSchema, 'storageconditionmaster')
