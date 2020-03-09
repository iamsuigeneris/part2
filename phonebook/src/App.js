import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Form from './components/Form'
import Filters from './components/Filters'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {

    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchTerm, setSearchTerm ] = useState('')
    const [message, setMessage] = useState(null)
   
    useEffect(() => {
        personService
        .getAll()
            .then( initialPersons => setPersons(initialPersons))    
    }, [])

    const rows = () => display.map(person => 
        <Person key={person.id} 
                person={person} 
                deletePersonOf={()=> deletePersonOf(person.id,person.name)}  
        /> 
    )
    
    const display = searchTerm
        ? persons.filter(person => (person.name).toLowerCase().includes(searchTerm))
        : persons;
    
    const checkName = persons.some(person => person.name === newName)   

    const addName = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber
        }

        const checkNumber = id => {
            const name = persons.find(n => n.name === newName)
            const updateNumber = {...name, number:newNumber}

            if(window.confirm(`${newName} is already in the phonebook, replace number?`)){
                personService
                    .update(name.id, updateNumber)
                    .then(returnedNumber => {
                        setPersons(persons.map(name => name.id !== id ? name : returnedNumber))
                    })
                  
            }
        }

        const displayMessage = (action) => {
            action
            ? checkNumber()
            : personService.create(personObject).then(data => {
                setMessage(`Added ${data.name}`)
                setPersons(persons.concat(data))
            })
            setTimeout(() => {
                setMessage(null)
              }, 4000)
        }

        displayMessage(checkName)
        setNewName('')
        setNewNumber('')

    }

    const deletePersonOf = (id,name) => {
        if(window.confirm(`Delete ${name}?`))  {  
            personService
            .deletePerson(id,name)
            .then( returnedPerson => {
                setPersons(returnedPerson)
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
            <Notification message={message} />

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