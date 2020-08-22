const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    }, {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

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

