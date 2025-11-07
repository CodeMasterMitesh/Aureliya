import mongoose from 'mongoose'
import app from './app.js'
import { env } from './config/index.js'
import { logger } from './middleware/logger.js'

const PORT = parseInt(env.PORT, 10)
const MONGODB_URI = env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => logger.info({ port: PORT }, 'Backend listening'))
  })
  .catch((err) => {
    logger.error({ err }, 'Mongo connection error')
    process.exit(1)
  })
