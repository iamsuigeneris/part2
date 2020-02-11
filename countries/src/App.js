import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [country, setCountry] = useState(false)
  const [show, setShow] = useState(false)
  
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
