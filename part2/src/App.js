import React, { useEffect } from "react"
import { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import axios from "axios"
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const found = persons.find(element => newName === element.name);
    if(found === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('fail')
      })
    }
    else {
      alert(`${newName} is already in the phonebook`)
    }
  }

  const removePerson = (id, event) => {
    event.preventDefault()
    const found = persons.find(element => id === element.id);
    if (window.confirm(`Delete ${found.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        const remainingPersons = persons.filter(n => n.id !== id)
        setPersons(remainingPersons)
      })
      .catch(error => {
        console.log('fail')
      })
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

      <Persons persons = {personsToShow} removePerson = {removePerson}/>

    </div>
  )
}

export default App