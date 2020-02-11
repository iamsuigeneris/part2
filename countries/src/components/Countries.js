import React from 'react'
import Country from './Country'

const Countries = ({country,setCountry,countries,setCountries,show,setShow}) => {

    let display = <div></div>
    let displayCountry = country ? <Country country={country} /> : display
    let displayShow = show ? <Country country={show}/> : display

    // const countryLanguages = (languages) => languages.map(
    //     language => 
    //       <li key={language.name}> {language.name} </li>
    // )

    if(countries.length === 0){
        setCountry(false)
        display = <div></div>
    } 
    else if(countries.length > 10){
        setCountry(false)
        display = <div>Too many matches, specify another filter</div>
    } 
    else if(countries.length > 1){
        display = countries.map(country => <div key={country.alpha3Code}>{country.name} <button onClick={() => handleClicks(country)}>show</button></div>)
    }
    else if(countries.length === 1){
        setCountry(countries[0])
        setShow(false)
    }

    const handleClicks = (country) => {
        if(show.name == country.name){
            setShow(false)
        }
        else{
            setShow(country)
        }
    }

    return(
        <div>
            {display}
            {displayCountry}
            {displayShow}
        </div>
    )

}

export default Countries