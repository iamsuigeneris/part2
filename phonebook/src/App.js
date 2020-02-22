import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Form from './components/Form'
import Filters from './components/Filters'
import personService from './services/persons'

const App = () => {

    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchTerm, setSearchTerm ] = useState('')
   
    useEffect(() => {
        personService
        .getAll()
            .then( initialPersons => setPersons(initialPersons))    
    }, [])

    const rows = () => display.map(person => 
        <Person key={person.id} person={person} /> 
    )
    
    const display = searchTerm
        ? persons.filter(person => (person.name).toLowerCase().includes(searchTerm))
        : persons;
  
    const addName = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber
        }

        let people = persons.map(person => person.name)
        if(people.includes(newName)){
            alert(`${newName} is already added to phonebook`)  
        }else{
            personService
            .create(personObject)
            .then( data => { 
                setPersons(persons.concat(data))
                setNewName('')
                setNewNumber('')
            }) 
        }     
    }
    
    
    const handleNameChange = (event) => {
        setNewName(event.target.value)       
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    return(
        <div>
            <h2>Phonebook</h2>

            <Filters searchTerm={searchTerm}
                     handleSearchChange={handleSearchChange}
             />

            <Form addName={addName}
                  newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange} 
            />
            <h2>Numbers</h2>
            <div> {rows()} </div>     
        </div>
    )
}

export default App