import { describe, it, expect } from '@jest/globals'
import { streamTable } from '../src/scripts/streamingImportUtil.js'

// Smoke test placeholder: ensures streamTable signature exists.
describe('streamingImportUtil', () => {
  it('exports streamTable function', () => {
    expect(typeof streamTable).toBe('function')
  })
})
