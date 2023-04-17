import React from "react"
import { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"


const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const found = persons.find(element => newName === element.name);
    if(found === undefined) {
      const entryObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(entryObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already in the phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = (filter === '')
    ? persons
    : persons.filter(word => word.name.toLowerCase().indexOf(filter) > -1)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        addPerson = {addPerson}
        filter = {filter} 
        handleFilterChange = {handleFilterChange}/>

      <h3>Add a new</h3>

      <PersonForm 
        addPerson = {addPerson}
        name = {newName} 
        number = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}/>

      <h2>Numbers</h2>

      <Persons persons = {personsToShow}/>

    </div>
  )
}

export default App