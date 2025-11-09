import mysql from 'mysql2/promise'
import { env } from '../config/index.js'
import { logger } from '../middleware/logger.js'

let pool

export async function initMysqlIfEnabled() {
  if (!env.MYSQL_ENABLED) {
    logger.info('MySQL disabled (MYSQL_ENABLED=false)')
    return
  }
  if (pool) {
    return
  }
  try {
    pool = mysql.createPool({
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT,
      user: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      database: env.MYSQL_DB,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 5,
      idleTimeout: 60000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    })
    // Simple health check
    const [rows] = await pool.query('SELECT 1 AS ok')
    if (rows && rows[0] && rows[0].ok === 1) {
      logger.info({ host: env.MYSQL_HOST, db: env.MYSQL_DB }, 'MySQL connected')
    }
  } catch (err) {
    logger.error({ err }, 'MySQL init failed')
    // Do not crash entire app yet; allow running Mongo-only while diagnosing
  }
}

export function getMysqlPool() {
  if (!pool) {
    throw new Error('MySQL pool not initialized or MYSQL_ENABLED=false')
  }
  return pool
}

// Utility for running queries with basic timing & error logging
export async function runQuery(sql, params = []) {
  const start = Date.now()
  try {
    const [rows] = await getMysqlPool().query(sql, params)
    const ms = Date.now() - start
    logger.debug({ sql, ms }, 'MySQL query')
    return rows
  } catch (err) {
    logger.error({ err, sql }, 'MySQL query error')
    throw err
  }
}
