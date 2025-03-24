const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialNotes[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialNotes[1])
    await blogObject.save()
})

test('blog length is returned and is parsed in JSON', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('blog id is defined', async () => {
    const response = await api.get('/api/blogs')

    assert.ok(response.body[0].id, 'id is not defined')
})

test('a valid blog is added', async () => {
    const newBlog = {
    "title": "My third blog",
    "author": "Lea Doe",
    "url": "http://example.com/my-first-blog",
    "likes": 8,
    "id": "5"
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const title = response.body.map(blog => blog.title)

    assert.strictEqual(response.body.length, helper.initialNotes.length + 1)

    assert(title.includes("My third blog"))
})

test("check if likes is missing", async () => {
    const newBlog = {
    "title": "My third blog",
    "author": "Lea Doe",
    "url": "http://example.com/my-first-blog",
    "id": "5"
    }

    const post = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find(blog => blog.id === post.body.id)

    assert.strictEqual(addedBlog.likes, 0)
})

test.only('check if title/url is missing', async () => {
    const newBlog = {
        "author": "Lea Doe",
        "id": "5"
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
})

after(async () => {
    await mongoose.connection.close()
  })