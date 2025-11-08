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
  // Provide original message for debugging (still generic for 500 if none)
  const rawMessage = err.message || 'Internal server error'
  const message = status === 500 ? rawMessage : rawMessage
  const stack = process.env.NODE_ENV === 'production' ? undefined : err.stack
  if (status >= 500 && req.log) {
    req.log.error({ err, stack }, 'Unhandled error')
  }
  res.status(status).json({ error: { code, message, details: err.details, stack } })
}
