/*
Defines all the logic regarding routes and database operations in the Blogs context.
 */

const blogListRouter = require('express').Router()
const Blog = require('../models/blog')

blogListRouter.get('/', ((req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
}))

blogListRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogListRouter
