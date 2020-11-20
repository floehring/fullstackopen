const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'clearck',
            name: 'Felix Loehring',
            password: 'mypw123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with duplicate username', async () => {
        const newUser = {
            username: 'clearck',
            name: 'Felix Loehring',
            password: 'mypw123'
        }

        await api
            .post('/api/users')
            .send(newUser)

        const dupeUser = {
            username: 'clearck',
            name: 'Felix Loeh',
            password: 'myfd123'
        }

        await api
            .post('/api/users')
            .send(dupeUser)
            .expect(400)
    })

    test('creation fails with missing password', async () => {
        const newUser = {
            username: 'clearck',
            name: 'Felix Loehring',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
