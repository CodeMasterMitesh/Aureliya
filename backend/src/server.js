import mongoose from 'mongoose'
import app from './app.js'
import { env } from './config/index.js'
import { logger } from './middleware/logger.js'
import { initMysqlIfEnabled } from './db/mysql.js'

const PORT = parseInt(env.PORT, 10)
const MONGODB_URI = env.MONGODB_URI

async function start() {
  try {
    // 1) Connect Mongo (legacy during transition)
    await mongoose.connect(MONGODB_URI)
    logger.info('Mongo connected')

    // 2) Init MySQL (optional) for migration/dual-run
    await initMysqlIfEnabled()

    // 3) Start server
    app.listen(PORT, () => logger.info({ port: PORT }, 'Backend listening'))
  } catch (err) {
    logger.error({ err }, 'Server startup error')
    process.exit(1)
  }
}

start()
