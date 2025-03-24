const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.likes) {
    blog.likes = 0
  }

  if(!blog.title || !blog.url) {
    response.status(400).end()
  }

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body.likes, { new: true })
  if (!blog) {
    return response.status(404).end()
  }
  
  response.json(blog)
})

module.exports = blogRouter