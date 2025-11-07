import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../src/app.js'
import { jest, describe, it, expect } from '@jest/globals'

jest.setTimeout(30000)

let mongod
let skip = process.env.RUN_INTEGRATION !== 'true'

beforeAll(async () => {
  try {
    mongod = await MongoMemoryServer.create({ binary: { version: '6.0.6' } })
    const uri = mongod.getUri()
    await mongoose.connect(uri)
  } catch (e) {
    skip = true
    console.warn('Skipping auth tests: could not start in-memory Mongo', e)
  }
})

afterAll(async () => {
  try {
    await mongoose.disconnect()
    if (mongod) await mongod.stop()
  } catch {
    /* ignore */
  }
})

describe('Auth register/login', () => {
  const testFn = skip ? it.skip : it
  testFn('registers and logs in successfully', async () => {
    const base = '/api/v1'
    const reg = await request(app)
      .post(`${base}/auth/register`)
      .send({ name: 'Test User', email: 'test@example.com', password: 'Password123!' })
    expect(reg.status).toBe(200)
    expect(reg.body.token).toBeTruthy()

    const login = await request(app)
      .post(`${base}/auth/login`)
      .send({ email: 'test@example.com', password: 'Password123!' })
    expect(login.status).toBe(200)
    expect(login.body.token).toBeTruthy()
  })
})
