import axios, { all } from 'axios';
import { useState, useEffect } from 'react';

function App() {
    const [country, setCountry] = useState('')
    const [countryList, setCountryList] = useState("Input a country name to search for it")
    const specificCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
    const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all/'

    const getAllCountries = () => {
        axios
            .get(allCountriesUrl)
            .then(response => response.data)
            .then(allCountries => setCountryList(allCountries))
    }
    
    useEffect(getAllCountries, [])

    const filterCountries = () => {
        return countryList.filter(country => country.name.common.includes(country))
    }

    const displayCountries = () => {
        const filteredCountries = filterCountries()
        
        if (filteredCountries.length === 1) {
            setCountryList(filteredCountries[0].name.common)
        }
        else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
            setCountryList(filterCountries.map(country => {
                console.log(country.name.common)
                return country.name.common
            }))
        }
        else {
            setCountryList("Too many matches, specify another filter.")
        }
    }

    const getSpecificCountry = () => {
        let request = axios.get(`${specificCountryUrl}${country}`)
        return request.then(response => response.data)
    }

    const handleCountry = (event) => {
        setCountry(event.target.value)
        displayCountries()
    }

    return (
        <div>
             <form>
                <div>
                find countries <input value={country} onChange={handleCountry} />
                </div>
            </form>
            <div>
                {displayCountries()}
            </div>
        </div>
    )
}

export default App;
