import React, { useEffect } from "react"
import { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import axios from "axios"


const App = () => {

  const [persons, setPersons] = useState([])
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


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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