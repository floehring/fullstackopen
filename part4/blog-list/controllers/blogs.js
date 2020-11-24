/*
Defines all the logic regarding routes and database operations in the Blogs context.
*/

const blogListRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogListRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({})
        // select specific fields to be returned by the populate
        .populate('user', 'username name id')
    res.json(blogs)
})

blogListRouter.post('/', async (request, response) => {

    const newBlog = request.body

    const token = getTokenFrom(request)

    if (!token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!newBlog.url && !newBlog.title) {
        response.status(400).end()
    } else {
        const blog = new Blog({ ...request.body, user: user.id })
        const result = await blog.save()
        response.status(201).json(result)
    }

})

blogListRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    await Blog.findByIdAndRemove(id)
    response.status(204).end()
})

blogListRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user,
    }

    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updatedBlog)
})

const getTokenFrom = req => {
    const auth = req.get('authorization')

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }

    return null
}

module.exports = blogListRouter
