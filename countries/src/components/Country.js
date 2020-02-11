import React from 'react'

const countryLanguages = (languages) => languages.map(
    language => 
      <li key={language.name}> {language.name} </li>
  )

const Country = ({country}) => {
    return(
        <div>
          <h2>{country.name}</h2>
          <div>capital {country.capital}</div>
          <div>population {country.population}</div>
          <h2>languages</h2>
          <ul>{countryLanguages(country.languages)}</ul>
          <img src={country.flag} width="100px" />
      </div>
    )
  }

  
export default Country