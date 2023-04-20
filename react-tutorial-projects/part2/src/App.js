// Made from tutorial at https://fullstackopen.com
import React, { useEffect } from "react"
import { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import axios from "axios"
import personService from './services/persons'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === '') {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  if(!persons) {
    return null
  }

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

        setNotificationMessage("Added " + returnedPerson.name )
        setTimeout(() => {
          setNotificationMessage('')
        }, 3000)
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
      <h1 className = 'test'>Phonebook</h1>
      <Notification message={notificationMessage} />
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

    <Footer />
    </div>
  )
}

export default App