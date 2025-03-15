import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import CountryFind from './components/CountryFind'
import CountryDetails from './components/CountryDetails'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState('')

  useEffect(() => {
    console.log('effect run, search query is now', search)

    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response => {
        setCountries(response.data)
    })
    .catch(error => console.log(error))
  }, [])

  const searchQueryUpdate = (event) => {
    setSearch(event.target.value)
    setCurrentCountry(null)
  }

  const showCountry = country => {
    setCurrentCountry(country)
  }

  const matchingCountry = search ? countries.filter(country => {
      return country.name.common.toLowerCase().includes(search.toLowerCase())
  }) : []

  return (
    <>
      <Content search={search} searching={searchQueryUpdate} />
      {matchingCountry.length === 1 ? <CountryDetails country={matchingCountry[0]} /> 
      : <CountryFind countries={matchingCountry} showCountry={showCountry} />}
      {currentCountry != '' ? currentCountry && <CountryDetails country={currentCountry} /> : []}
    </>
  )
}

export default App