import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState([
    { 
      message: 'no error has occured',
      error: false
     }
  ])

  useEffect(() => {
    phonebookService.get().then(fullList => setPersons(fullList))
    .catch((error) => {
      console.log(error)
      setErrorMessage({
        message: `People could not be obtained`,
        error: true,
      })

      setTimeout(() => {
        setErrorMessage({ message: null, error: false })
      }, 5000)
    })
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
      phonebookService.destroy(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setErrorMessage({
            message: `Delete ${name}`,
          })
        })
        .catch((error) => {
          setErrorMessage({
            message: `Information of ${name} has already been removed from server`,
            error: true,
          })
        })
        .finally(() => {
          setTimeout(() => {
            setMessage({ message: null, error: false })
          }, 5000)
        })
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
        phonebookService.update(changedPerson.id, changedPerson).then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
            setErrorMessage({
              message: `Update ${returnedPerson.name}`,
            })
          })
          .catch((error) => {//if error occurs updated name list hasn't rendered to front-end or an error occured that shows a deleted name (deleted from backend)
            setErrorMessage({
              message: `Information of ${newName} has already been removed from server`,
              error: true,
            })
            setPersons(persons.filter(person => person.id !== existingPerson.id)) //filter out name from persons array
          })
          .finally(() => {
            setTimeout(() => {
              setMessage({ message: null, error: false })
            }, 5000)
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      phonebookService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage({
            message: `Added ${returnedPerson.name}`,
          })
        })
        .catch((error) => {
          setErrorMessage({
            message: error.response.data.error,
            error: true,
          })
        })
        .finally(() => {
          setTimeout(() => {
            setErrorMessage({ message: null, error: false })
          }, 5000)
        })
    }

      //set input fields clear preparing for next input
      setNewName('')
      setNumber('')
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage.message} isError={errorMessage.error} />
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