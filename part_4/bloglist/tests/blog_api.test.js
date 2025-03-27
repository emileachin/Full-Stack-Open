const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

describe('tests the endpoint that obtains the blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('the unique identifier property of blog posts it is called id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('tests the endpoint that adds a blog', () => {
  let headers
  beforeEach(async () => {
    headers = {
      Authorization: await helper.loginUser(),
    }
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Emilea test try',
      author: 'Lea C',
      url: 'https://hopeyouwork.com',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    assert(titles.contains('Emilea test try'))
  })

  test('likes default value is 0', async () => {
    const newBlog = {
        title: 'Emilea test try',
        author: 'Lea C',
        url: 'https://hopeyouwork.com',
      }

    const postResponse = await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find((blog) => blog.id === postResponse.body.id)
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
        author: 'Lea C',
        url: 'https://hopeyouwork.com',
        likes: 12
      }

    await api.post('/api/blogs').set(headers).send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd, helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
        title: 'Emilea test try',
        author: 'Lea C',
        likes: 12
      }

    await api.post('/api/blogs').set(headers).send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd, helper.initialBlogs.length)
  })

  test('blog without authorization is not added', async () => {
    const newBlog = {
        title: 'Emilea test try',
        author: 'Lea C',
        url: 'https://hopeyouwork.com',
        likes: 12
      }

    const result = await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).not.toContain(newBlog.title)

    expect(result.body.error).toContain('token missing or invalid')
  })
})

describe('tests the endpoint that deletes a blog', () => {
  let headers
  beforeEach(async () => {
    headers = {
      Authorization: await helper.loginUser(),
    }
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
        title: 'Emilea test try',
        author: 'Lea C',
        url: 'https://hopeyouwork.com',
        likes: 12
      }

    const savedBlog = await api.post('/api/blogs').set(headers).send(newBlog)

    await api.delete(`/api/blogs/${savedBlog.body.id}`).set(headers).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).not.toContain(newBlog.title)
  })
})

describe('tests the endpoint that updates a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const updatedBlogInDB = blogsAtEnd.find((r) => r.id === blogToUpdate.id)
    expect(updatedBlogInDB.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})