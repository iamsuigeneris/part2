import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
    const [ persons, setPersons] = useState([{name:'Arto Hellas', id:1}])
    const [ newName, setNewName ] = useState('')

    const rows = () => persons.map(person => 
        <Person key={person.id} person={person} />
        
    )
  
    const addName = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            id:persons.length + 1  
        }

        setPersons(persons.concat(personObject))
        setNewName('')
    }

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    return(
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handlePersonChange}/>
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