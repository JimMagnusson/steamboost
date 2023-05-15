const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')



app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())



const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: Number,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<3 ) {
  console.log('give password')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jimmagnusson:${password}@cluster0.qw1m2ir.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

let persons = [
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
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
  Person
  .find({})
  .then(persons => {
    response.json(persons)
    mongoose.connection.close()
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send('<p>Phonebook has info for ' +persons.length+ ' people</p> <p>'+ date + '<p>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(note => note.id === id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
})

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const generateId = () => getRandomInt(0, 100000)

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
    const found = persons.find(element => element.name === body.name)
    if(found != undefined) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
  
    persons = persons.concat(person)
    
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
  
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)