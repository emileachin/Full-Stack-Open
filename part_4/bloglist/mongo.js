const mongoose = require('mongoose')

const url = 'mongodb+srv://emileachinn:jQl2A4cVWoDDGfnz@blogs.ex6tc.mongodb.net/testBlogs?retryWrites=true&w=majority&appName=Blogs'

mongoose.set('strictQuery', false)

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

const blog2 = new Blog({
    "title": "My second blog",
    "author": "John Doe",
    "url": "http://example.com/my-first-blog",
    "likes": 5,
    "id": "67df9026c59e7bbf2095037d"
})

blog2.save().then(result => {
    console.log("blog saved", result)
    mongoose.connection.close()
})