const mongoose = require('mongoose');

const name = process.argv[3]
const number = process.argv[4]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

console.log('connecting to', url)

mongoose.connect(url).then(result => {
    console.log("connected to MongoDB")
}).catch(error => {
    console.log("Error connecting to MongoDB: ", error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)