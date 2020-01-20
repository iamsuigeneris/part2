import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const rows = () => persons.map(person => 
        <Person key={person.id} person={person} />
        
    )
  
    const addName = (event) => {
        event.preventDefault()

        const personObject = {
            id:persons.length + 1,
            name: newName,
            number:newNumber
        }

        let people = persons.map(person => person.name)
        if(people.includes(newName)){
            alert(`${newName} is already added to phonebook`)  
        }else{
            setPersons(persons.concat(personObject))
        }            
        // setNewName('')
        // setNewNumber('')
    }

    const handleNameChange = (event) => {
            setNewName(event.target.value)       
    }
    const handleNumberChange = (event) => {
            setNewNumber(event.target.value)
    }

    return(
        <div>
            <h2>Phonebook</h2>
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