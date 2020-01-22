import React, { useState } from 'react'
import Person from './components/Person'

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
        : persons ;
  
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
            <div>
                filter shown with <input value={searchTerm} onChange={handleSearchChange}/>
            </div>
            <h2>add a new  </h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
              
            </form >
            <h2>Numbers</h2>
            <div> {rows()} </div>     
        </div>
    )
}

export default App