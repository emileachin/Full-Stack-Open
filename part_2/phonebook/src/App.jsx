import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService.get().then(fullList => setPersons(fullList))
  },[])

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const checkFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === '' ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))
  
  const deletePerson = (id, name) => { //get id and name from persons array map in persons component button
    if (window.confirm(`Delete ${name}?`)) //confirm to delete name from program
    {
      //delete note from server with provided id from persons component
      //then filter out the deleted note from the persons state/array to display and log properly
      phonebookService.destroy(id).then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const numberAdd = (event) => {
    setNumber(event.target.value)
  }

  const submitName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName) //check if name already exists in persons array

    if (existingPerson) { //if name exists/truthy
      //window confirm with user that name exists and confirm if they wish to replace it
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) 
      {
      //variable to log object of the changed person with the same properties except the number
        const changedPerson = { ...existingPerson, number: newNumber }
        //update backend with new number
        phonebookService.update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          //then set persons state/array to display new number, mapping through the array to replace the changed contact
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          //set input fields clear preparing for next input
          setNewName('')
          setNumber('')
        })
    }
    }
    else {
      //if name doesn't exist, user can create new contact in phonebook
      const nameObject = {
        name: newName,
        number: newNumber
      } 

      //create new contact in backend by posting new object then concatting it to persons array
      phonebookService.create(nameObject).then(newPerson => setPersons(persons.concat(newPerson)))
      //set input fields clear preparing for next input
      setNewName('')
      setNumber('')
    }
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
         <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App