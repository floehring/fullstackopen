/*
Contains the main app which is loaded by the index file.
 */
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogListRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

morgan.token('content', req => !req.body ? '' : JSON.stringify(req.body))

// app.use(
//     morgan(
//         ':method :url :status :res[content-length] - :response-time ms :content'
//     )
// )

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// Taking the router for user related routes into use.
app.use('/api/users', usersRouter)

// Taking the router for blog related routes into use.
app.use('/api/blogs', blogListRouter)

// Taking the router for login related routes into use
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
