import mongoose from 'mongoose'
const { Schema } = mongoose

const LoginSchema = new Schema({
  id: { type: Number }, // id int(11)
  username: { type: String }, // username varchar(255)
  password: { type: String }, // password varchar(255)
}, { timestamps: false })

export default mongoose.model('Login', LoginSchema, 'login')
