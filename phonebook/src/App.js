import React, { useState } from 'react'
import Person from './components/Person'
import Form from './components/Form'
import Filters from './components/Filters'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchTerm, setSearchTerm ] = useState('')
   
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
            setPersons(persons.concat(personObject))
        }            
        setNewName('')
        setNewNumber('')
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