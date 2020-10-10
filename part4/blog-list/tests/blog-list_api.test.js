const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = helper.initialBlogs

beforeEach(async () => {
    await Blog.deleteMany({})

    let blog = new Blog(initialBlogs[0])
    await blog.save()

    blog = new Blog(initialBlogs[1])
    await blog.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('blogs have an id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('blogs are updated correctly', async () => {
    const startBlogs = await helper.blogsInDb()
    const startBlog = startBlogs[0]

    await api
        .put(`/api/blogs/${ startBlog.id }`)
        .send({ ...startBlog, likes: 10 })
        .expect({ ...startBlog, likes: 10 })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${ blogToDelete.id }`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
    })
})

describe('when saving a blog', () => {
    test('its saved correctly', async () => {
        const blog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)

        const blogs = await api.get('/api/blogs')

        expect(blogs.body).toHaveLength(initialBlogs.length + 1)
    })

    test('likes default to 0 if not specified', async () => {
        const blog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        }

        const newBlog = await api
            .post('/api/blogs')
            .set('Content-Type', 'application/json')
            .send(blog)

        expect(newBlog.body.likes)
            .toBe(0)
    })

    test('400 is returned if url and title are missing', async () => {
        const blog = {
            author: 'Edsger W. Dijkstra',
        }

        await api
            .post('/api/blogs')
            .set('Content-Type', 'application/json')
            .send(blog)
            .expect(400)
    })
});


afterAll(() => {
    mongoose.connection.close()
})

