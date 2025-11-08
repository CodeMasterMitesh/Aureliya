import mongoose from 'mongoose'
const { Schema } = mongoose

const FinancialyearSchema = new Schema({
  id: { type: Number }, // id int(11)
  financialyear: { type: String }, // financialyear varchar(255)
  yearStartDate: { type: Date }, // year_start_date datetime
  yearEndDate: { type: Date }, // year_end_date datetime
  deleteField: { type: Number }, // delete int(11)
  active: { type: Number }, // active int(11)
  company: { type: Number }, // company int(11)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
}, { timestamps: false })

export default mongoose.model('Financialyear', FinancialyearSchema, 'financialyear')
