export class AppError extends Error {
  constructor(message, status = 500, code = 'INTERNAL_ERROR', details) {
    super(message)
    this.status = status
    this.code = code
    this.details = details
  }
}

export function notFound(req, res, next) {
  next(new AppError('Not found', 404, 'NOT_FOUND'))
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500
  const code = err.code || 'INTERNAL_ERROR'
  const message = status === 500 ? 'Internal server error' : err.message
  if (status >= 500 && req.log) {
    req.log.error({ err }, 'Unhandled error')
  }
  res.status(status).json({ error: { code, message, details: err.details } })
}
