const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')
 
morgan.token('body', (request) => JSON.stringify(request.body))
 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
  
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
  

app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send("<h1>Phonebook</h1>")
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => 
        response.json(person)
    )
})

app.get('/info', (request, response) => {
    const date = new Date()

    Person.find({}).then(people => {
        response.send(`Phonebook has info for ${people.length} people <br /> ${Date()}`)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(() => {
      response.status(204).end()
    }).catch(error => next(error))
  })

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body 

    Person.findOne({name: name}).then(person => {
        if (!person) {
            return response.status(404).end()
          }
        else {
            person.number = number

            return person.save().then(newNum => {
                response.json(newNum)
            })
        }
    }).catch(error => next(error))
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1000)
    return String(id)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name ) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if(!body.number ) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        id: generateId(),
        name: body.name,
        number: body.number,
    })

    person.save().then(person => {
        response.json(person)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}  

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})