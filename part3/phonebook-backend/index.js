const express = require('express')
const app = express()
const moment = require('moment')
const morgan = require('morgan')

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body) )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



const PORT = 3001

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send("<h1>Hello World</h1>")
})

app.get('/info', (request, response) => {
    let ret = `
    Phonebook has info for ${phonebook.length} people
    <br/>
    ${moment().format('HH:mm:ss')}
    `
    response.send(ret)
})

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id) // all information is sent over the server as strings
    const entry = phonebook.find(entry => entry.id === id)
    
    if (entry) {
        response.json(entry)
    }
    else {
        response.status(404)
          .end()
    }

})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(entry => entry.id !== id)

    response.status(204).end()
})

const generateId = () => {
    // const maxId = phonebook.length > 0
    //   ? Math.max(...phonebook.map(n => n.id))
    //   : 0
    // return maxId + 1
    return Math.floor(Math.random() * 1000000)
  }

app.post('/api/phonebook/', (request, response) => {
    
    let body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'person name or number missing'
        })
    }

    let alreadyExists = phonebook.find(entry => entry.name === body.name)
    if (alreadyExists) {
        return response.status(400).json({
            error: 'person name must be unique'
        })
    }

    let entry = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(entry)

    response.json(entry)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
