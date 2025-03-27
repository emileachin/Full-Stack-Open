
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      "title": "My first blog",
      "author": "John Doe",
      "url": "http://example.com/my-first-blog",
      "likes": 0,
      "id": "67e0db60c974352015d80d58"
    },
    {
      "title": "My second blog",
      "author": "John Doe",
      "url": "http://example.com/my-first-blog",
      "likes": 5,
      "id": "67e0dbb7af5315644f8b7781"
    }
  ]

  const blogsinDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map((user) => user.toJSON())
  }

  
module.exports = { initialBlogs, blogsinDB, usersInDb }