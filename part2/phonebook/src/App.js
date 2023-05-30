import { useState, useEffect } from 'react'
import peopleService from './services/people'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [searchName, setSearchName] = useState('')

  const getPersons = () => {
    peopleService
      .getPeople()
      .then(storedPeople => setPersons(storedPeople))
  }

  useEffect(getPersons, [])

  const addPerson = (event) => {
    event.preventDefault()
    let foundPerson = persons.find(person => person.name === newName)
    if (foundPerson === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      peopleService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber(0)
        })
    }
    else if ((foundPerson !== undefined) && newNumber !== foundPerson.number) {
      if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const modifiedPerson = { ...foundPerson, number: newNumber}
        peopleService
          .modifyNumber(modifiedPerson)
          .then(returnedPerson => {
            console.log('number modified')
            setPersons(persons.map(person => (person.id !== foundPerson.id) ? person : returnedPerson))
          })
      }
    }
    else {
      alert(`${newName} is already added to phonebook.`)
    }
  }

  const getMatches = () => {
    return persons.filter(person => person.name.toLowerCase().search(searchName.toLowerCase()) !== -1)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName}/>
      <PersonForm state={{newname: newName, newNumber: newNumber}} handleState={{addPerson: addPerson, handleNameChange: handleNameChange, handleNumberChange: handleNumberChange}} />
      <h2>Numbers</h2>
      <Persons persons={getMatches()}/>
      {/* <div>debug: {newName}</div>  render state as text for debugging purposes */}
    </div>
  )
}

export default App