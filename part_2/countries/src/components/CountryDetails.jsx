import { useState, useEffect } from "react"
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const CountryDetails = ({country}) => {
    const [weatherInfo, setWeatherInfo] = useState(null)
    useEffect(() => {
        
        
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${api_key}`)
        .then(response => {
            const latitude = response.data[0].lat
            const longitude = response.data[0].lon

            return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
            })
            .then((response) => {
              setWeatherInfo(response.data)
            })
            .catch((error) => {
              console.log('error fetching data ', error)
            })
        }, [country])
    

    const src = `https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}.png`
    const wind = `${weatherInfo?.wind.speed}`
    const temperature = `${(weatherInfo?.main.temp - 273.15).toFixed(2)}`


    return (
        <>
            <div>
                <h1>{country.name.common}</h1>
                <p>Area {country.area}</p>
                <h2>Languages</h2>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                <img width={300} src={country.flags.png} alt={country.flags.alt} />
            </div>
            {weatherInfo && (<div>
                <h1>Weather in {country.capital}</h1>
                <p>Temperature {temperature} °C</p>
                <img src={src} width={100} alt={weatherInfo.weather[0].description} />
                <p>Wind {wind}</p>
            </div>)}
        </>    
    )
}

export default CountryDetails

