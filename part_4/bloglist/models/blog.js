const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log("connecting to MONGODB")
mongoose.connect(url)
.then(() => console.log("connected to MONGODB"))
.catch((error) => console.log("error connecting to MONGODB", error.message))

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
      type: Number,
      require: false,
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)