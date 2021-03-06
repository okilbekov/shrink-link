const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const authRouter = require('./routes/auth.routes')
const linkRouter = require('./routes/link.routes')
const redirectRouter = require('./routes/redirect.routes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const path = require('path')
const mongoose = require('mongoose')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json({ extended: true }))
app.use(middleware.requestLogger)

app.use('/api/auth', authRouter)
app.use('/api/link', linkRouter)
app.use('/t', redirectRouter)

if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app