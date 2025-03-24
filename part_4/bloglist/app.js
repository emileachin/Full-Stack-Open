const config = require('./utils/config')
const logger = require('./utils/logger')
require('express-async-errors')
const middleware = require('./utils/middleware')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')

const app = express()

mongoose.set('strictQuery', false)

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info('Connected to MongoDB')
}).catch(error => logger.error('Error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app