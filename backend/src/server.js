import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aureliya_ecom'

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Backend listening on :${PORT}`))
  })
  .catch((err) => {
    console.error('Mongo connection error:', err)
    process.exit(1)
  })
