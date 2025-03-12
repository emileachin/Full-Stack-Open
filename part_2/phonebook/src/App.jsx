import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1, filtered: false },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2, filtered: false },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3, filtered: false },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, filtered: false }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

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