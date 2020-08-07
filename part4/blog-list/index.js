require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const morgan = require('morgan')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3003

morgan.token('content', req => !req.body ? '' : JSON.stringify(req.body))

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :content'
    )
)

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
