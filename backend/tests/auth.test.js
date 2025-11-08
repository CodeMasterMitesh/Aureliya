import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../src/app.js'
import { jest, describe, it, expect } from '@jest/globals'

// Only run this suite when explicitly enabled. Avoid starting Mongo/downloads otherwise.
const runIntegration = process.env.RUN_INTEGRATION === 'true'

const d = runIntegration ? describe : describe.skip

let mongod

d('Auth register/login', () => {
  jest.setTimeout(30000)

  beforeAll(async () => {
    try {
      mongod = await MongoMemoryServer.create({ binary: { version: '6.0.6' } })
      const uri = mongod.getUri()
      await mongoose.connect(uri)
    } catch (e) {
      // If we fail to provision in-memory Mongo, skip the tests rather than leak handles
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

  it('registers and logs in successfully', async () => {
    const base = '/api/v1'
    // Fetch CSRF token first
    const csrfRes = await request(app).get(`${base}/csrf`)
    expect(csrfRes.status).toBe(200)
    const csrfToken = csrfRes.body.csrfToken
    const xsrfCookie = csrfRes.headers['set-cookie']?.find(c => c.startsWith('XSRF-TOKEN='))
    expect(csrfToken).toBeTruthy()
    expect(xsrfCookie).toBeTruthy()

    const reg = await request(app)
      .post(`${base}/auth/register`)
      .set('Cookie', xsrfCookie)
      .set('X-XSRF-TOKEN', csrfToken)
      .send({ name: 'Test User', email: 'test@example.com', password: 'Password123!' })
    expect(reg.status).toBe(200)
    expect(reg.body.token).toBeTruthy()

    const login = await request(app)
      .post(`${base}/auth/login`)
      .set('Cookie', xsrfCookie)
      .set('X-XSRF-TOKEN', csrfToken)
      .send({ email: 'test@example.com', password: 'Password123!' })
    expect(login.status).toBe(200)
    expect(login.body.token).toBeTruthy()
  })
})
