const express = require('express')
const app = express()
var moment = require('moment')

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
    ret = `
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
        response.status(404).end()
    }

})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = phonebook.filter(entry => entry.id !== id)

    response.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
