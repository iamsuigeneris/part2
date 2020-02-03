import React, {useState, useEffect} from 'react';
import axios from 'axios'
// import Country from './components/Country'
import Search from './components/Search'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
 
//   useEffect(() => {
//     axios
//         .get('https://restcountries.eu/rest/v2/all')
//         .then(response => {
//             console.log('promise fulfilled')
//             setCountries(response.data)
//         })
// }, [])

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value)
  getDataFromAPI(event.target.value)
}

// inspired by vsparrow's code from github.. didn't use useEffect here
// but instead use a function to store the data
const getDataFromAPI = (name) => {
    axios
    .get('https://restcountries.eu/rest/v2/name/' + name)
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
  })
}

  const countryLanguages = (languages) => languages.map(
      language => 
        <li key={language.name}> {language.name} </li>
    )

  const rows = () => {
    if(countries.length === 0){
      return <p></p>
    }
    else if(countries.length > 10){
      return <div>Too many matches, specify another filter</div>
    }
    else if(countries.length > 1){
      const displayCountries = countries.map(country => <div key={country.alpha3Code}> {country.name}</div>)
      return displayCountries;
    }
    else if(countries.length === 1){
      return(
        <div>
          <h2>{countries[0].name}</h2>
          <div>capital {countries[0].capital}</div>
          <div>population {countries[0].population}</div>
          <h2>languages</h2>
          <ul>{countryLanguages(countries[0].languages)}</ul>
          <img src={countries[0].flag} width="100px" />
        </div>
      )
    }
  }

  return(

      <div>
            <Search onChange={searchTerm} handleSearchChange={handleSearchChange} />
            <div>{rows()}</div>
      </div>
    )
}

export default App;
