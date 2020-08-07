const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs
        .map(blog => blog.likes)
        .reduce((acc, curr) => acc + curr, 0)
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    const { title, author, likes } = blogs.sort((a, b) => b.likes - a.likes)[0]

    return { title, author, likes }
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    const blogsByAuthor = _.countBy(blogs, 'author')
    const authorWithMostBlogs = Object
        .keys(blogsByAuthor)
        .reduce((a, b) => blogsByAuthor[a] > blogsByAuthor[b] ? a : b)

    return { author: authorWithMostBlogs, blogs: blogsByAuthor[authorWithMostBlogs] }
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    const likesByAuthor = _.mapValues(_.groupBy(blogs, 'author'), (value) =>
        value.reduce((acc, curr) => acc + curr.likes, 0))

    const authorWithMostLikes = Object
        .keys(likesByAuthor)
        .reduce((a, b) => likesByAuthor[a] > likesByAuthor[b] ? a : b)

    return { author: authorWithMostLikes, likes: likesByAuthor[authorWithMostLikes] }
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
