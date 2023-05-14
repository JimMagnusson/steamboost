const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: Number,
})
const Person = mongoose.model('Person', noteSchema)

if (process.argv.length<3 || process.argv.length==4) {
  console.log('give password, name and number as argument or only password to show all entries')
  mongoose.connection.close()
  process.exit(1)
}
else if (process.argv.length==3) {
  const password = process.argv[2]
  const url =
    `mongodb+srv://jimmagnusson:${password}@cluster0.qw1m2ir.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.set('strictQuery',false)
  mongoose.connect(url)
  Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    });
    mongoose.connection.close()
  })
}
else {
  const password = process.argv[2]
  const url =
    `mongodb+srv://jimmagnusson:${password}@cluster0.qw1m2ir.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.set('strictQuery',false)
  mongoose.connect(url)
  const person = new Person({
    id: 0,
    name: process.argv[3],
    number: process.argv[4],
  })
    person.save().then(result => {
      console.log('person saved!')
      mongoose.connection.close()
    })
}

