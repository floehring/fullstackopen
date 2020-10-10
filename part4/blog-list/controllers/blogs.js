/*
Defines all the logic regarding routes and database operations in the Blogs context.
 */

const blogListRouter = require('express').Router()
const Blog = require('../models/blog')

blogListRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogListRouter.post('/', async (request, response) => {

    const newBlog = request.body

    if (!newBlog.url && !newBlog.title) {
        response.status(400).end()
    } else {
        const blog = new Blog(request.body)
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
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogListRouter
