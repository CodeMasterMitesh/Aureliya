import app from './app.js'
import { env } from './config/index.js'
import { logger } from './middleware/logger.js'
import { initMysqlIfEnabled } from './db/mysql.js'

const PORT = parseInt(env.PORT, 10)
async function start() {
  try {
    // Init only MySQL now (Mongo removed)
    await initMysqlIfEnabled()
    app.listen(PORT, () => logger.info({ port: PORT }, 'Backend listening (MySQL only)'))
  } catch (err) {
    logger.error({ err }, 'Server startup error')
    process.exit(1)
  }
}

start()
