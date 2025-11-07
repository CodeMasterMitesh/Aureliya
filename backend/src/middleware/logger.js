import pino from 'pino'
import pinoHttp from 'pino-http'
import { randomUUID } from 'crypto'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: true },
        }
      : undefined,
})

export function requestId(req, res, next) {
  const id = req.headers['x-request-id'] || randomUUID()
  req.id = id
  res.setHeader('X-Request-ID', id)
  next()
}

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.id || randomUUID(),
  customProps: (req) => ({ requestId: req.id }),
})
