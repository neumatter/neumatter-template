import process from 'process'

const ifError = async (err, req, res, next) => {
  (err.status && err.status === 404
    ? await res.status(404).render('404', { err: err.stack || err })
    : await next(err)
  )
}

const getActualRequestDurationInMilliseconds = start => {
  const NS_TO_MS = 1e6 // convert to milliseconds
  const end = process.hrtime.bigint().toString()
  return (Number(end) - Number(start)) / NS_TO_MS
}

const demoLogger = (req, res, next) => {
  const date = new Date().toISOString().replace('T', ' ').split('.')[0]
  const { method, url } = req
  const start = process.hrtime.bigint().toString()
  const resFinishListener = () => {
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start)
    const log = `[${date}] ${method}:${url} ${res.statusCode} ${durationInMilliseconds.toLocaleString()} ms`
    console.info(log)
    if (process.env.NODE_ENV === 'development') console.info(log)
  }
  res.on('close', resFinishListener)
  return next()
}

export default [
  demoLogger,
  ifError
]
