const CountryFind = props => {
    return (
        <>
        {props.countries.length < 10 ? props.countries.map(country => 
            <>
                <p key={country.name.common}>{country.name.common}</p>
                <button onClick={() => props.showCountry(country)}>Show</button>
            </>
        ) : <p>Too many matches, specify another filter</p>
        }
        </>
    )
  }

export default CountryFind