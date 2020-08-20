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
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogListRouter
