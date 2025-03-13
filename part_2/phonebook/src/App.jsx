import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/persons").then(response => {
      const phonebook = response.data
      setPersons(phonebook)
    })
  }, [])

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const checkFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === '' ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))


  const rowNames = () => personsToShow.map(person => 
  <p key={person.name}>{person.name} {person.number}</p>
  )
  

  const numberAdd = (event) => {
    setNumber(event.target.value)
  }

  const submitName = (event) => {
    event.preventDefault()

    persons.map(person => 
      {if (person.name.includes(newName)) {
        alert(`${newName} is already added to phonebook`)
        return
      }
      else {
        const nameObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1
        }
        setPersons(persons.concat(nameObject))
      }
    })
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} checkFilter={checkFilter} />
      <form onSubmit={submitName}>
        <h2>add a new</h2>
        <PersonForm newName={newName} nameChange={nameChange} newNumber={newNumber} numberAdd={numberAdd} />
      </form>
      <h2>Numbers</h2>
         <Persons rowNames={rowNames()} />
    </div>
  )
}

export default App