/*
  Streaming MySQL -> Mongo import utility with batch processing.
  Usage: import { streamTable } from './streamingImportUtil.js'
*/

import mysql from 'mysql2/promise'

export async function createMysqlConn(env){
  return mysql.createConnection({
    host: env.MYSQL_HOST,
    port: Number(env.MYSQL_PORT || 3306),
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    rowsAsArray: false
  })
}

export async function streamTable(conn, table, { batchSize = 1000, where = '1=1', orderBy = 'id', select = '*', onBatch }){
  let lastId = 0
  let total = 0
  // Fallback when no id column: rely on offset/limit
  const hasId = await hasIdColumn(conn, table)
  if (!hasId){
    let offset = 0
    // eslint-disable-next-line no-constant-condition
    while(true){
      const [rows] = await conn.execute(`SELECT ${select} FROM \`${table}\` WHERE ${where} ORDER BY ${orderBy} LIMIT ${batchSize} OFFSET ${offset}`)
      if (!rows.length) break
      await onBatch(rows)
      total += rows.length
      offset += rows.length
    }
    return total
  }
  // id-based pagination
  // eslint-disable-next-line no-constant-condition
  while(true){
    const [rows] = await conn.execute(`SELECT ${select} FROM \`${table}\` WHERE ${where} AND id > ? ORDER BY id ASC LIMIT ${batchSize}`, [lastId])
    if (!rows.length) break
    await onBatch(rows)
    total += rows.length
    lastId = rows[rows.length - 1].id
  }
  return total
}

async function hasIdColumn(conn, table){
  const [rows] = await conn.execute('SHOW COLUMNS FROM `' + table + "` LIKE 'id'")
  return rows && rows.length > 0
}

export async function tableExists(conn, table){
  const [rows] = await conn.execute("SHOW TABLES LIKE ?", [table])
  return rows && rows.length > 0
}
