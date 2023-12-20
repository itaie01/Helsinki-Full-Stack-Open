require('dotenv').config()
const express = require('express')
const moment = require('moment')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req, res) => JSON.stringify(req.body) )

const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

app.get('/', (request, response) => {
    response.send("<h1>Hello World</h1>")
})

app.get('/info', (request, response) => {
    
    Person.countDocuments({})
        .then(count => {
            const info = `
            Phonebook has info for ${count} people
            <br/>
            ${moment().format('HH:mm:ss')}`
            response.send(info)
        })
        .catch(error => {
            console.error(error)
            response.status(500).end()
        })
})

app.get('/api/phonebook', (request, response) => {
    Person.find({})
        .then(people => {
            response.json(people)
        })
})

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

app.get('/api/phonebook/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
}
app.use(errorHandler)

app.delete('/api/phonebook/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                const message = `${person.name} @ ${person.number} deleted from phonebook.`
                Person.findByIdAndDelete(id)
                    .then(() => response.status(204).send({ message }))
                    .catch(error => next(error))
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/phonebook/', (request, response) => {
    const body = request.body

    if (body.name === undefined && body.number === undefined) {
        return response.status(400).json({ error: 'name and number missing'})
    }
    else if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing'})
    }
    else if (body.number === undefined) {
        return response.status(400).json({ error: 'number missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => response.json(savedPerson))
})

app.put('api/phonebook/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body
    Person.findByIdAndUpdate(id, { number: body.number }, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
