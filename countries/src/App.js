import React, {useState} from 'react';
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [country, setCountry] = useState(false)
  const [show, setShow] = useState(false)
  
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value)
  getDataFromAPI(event.target.value)
 
}
const getDataFromAPI = (name) => {
    axios
    .get('https://restcountries.eu/rest/v2/name/' + name)
    .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)  
  })
}

  return(
      <div>
            <Search onChange={searchTerm} handleSearchChange={handleSearchChange} />
          
            <Countries countries={countries} 
                       country={country}
                       show={show}
                       setCountries={setCountries}
                       setCountry={setCountry}
                       setShow={setShow} 
                    />
      </div>
    )
}

export default App;
