const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blog length is returned and is parsed in JSON', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
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

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

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

test('check if title/url is missing', async () => {
    const newBlog = {
        "author": "Lea Doe",
        "id": "5"
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
})

test('a blog is deleted', async () => {
    const blogs = await helper.blogsinDB()
    const deleteNote = blogs[0]
    
    await api.delete(`/api/blogs/${deleteNote.id}`).expect(204)

    const newBlogs = await helper.blogsinDB()

    assert.strictEqual(newBlogs.length, helper.initialBlogs.length - 1)

    const contents = newBlogs.map(blog => blog.title)
    
    assert.ok(!contents.includes(deleteNote.title))
})

test.only('update the likes on a blog', async () => {
    const blogs = await helper.blogsinDB()
    const blogToUpdate = blogs[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: 11,
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)
})

after(async () => {
    await mongoose.connection.close()
  })