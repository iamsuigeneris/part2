import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Form from './components/Form'
import Filters from './components/Filters'
import Notification from './components/Notification'
import personService from './services/persons'
// import './index.css'

const App = () => {

    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchTerm, setSearchTerm ] = useState('')
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(null)
   
    useEffect(() => {
        personService
        .getAll()
            .then( initialPersons => setPersons(initialPersons))    
            .catch( error => showMessage("Can't retireve data now", false))
    }, [])

    const rows = () => display.map(person =>
        <Person key={person.id} 
                person={person} 
                deletePersonOf={() => deletePersonOf(person)}  
              
        /> 
    )
    
    const display = searchTerm
        ? persons.filter(person => (person.name).toLowerCase().includes(searchTerm))
        : persons;
    
    const addName = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber,
            
        }

        if(persons.some( e => e.name === newName)){
            let personId = persons.find( item => item.name === newName)

            let updatedEntry = Object.assign(personId, personObject)

            if(window.confirm(`${newName} Do you want to update with number ${newNumber}`)){
                personService
                    .update(personId.id, personObject)
                    .then(() => {
                        setPersons(persons.map(item => (item.name === newName ? updatedEntry : item)));
                        setNewName("");
                        setNewNumber("")
                        showMessage(`User ${newName} phone number updated`);
                    })
                    .catch( error => {
                        showMessage(
                            `Update failed. User ${newName} has already been removed from the phonebook.`,false
                        )
                        setPersons(persons.filter( n => n.name !== newName ))
                    })
                  
            }
        }else{
            if( persons.some( e => e.number === newNumber)) {
                showMessage(`${newNumber} is already in the phonebook.`, false)
            }else{
                if( newName === "" || newNumber === "") {
                    showMessage(`The name and number must not be empty`, false)
                }else{
                    personService
                        .create(personObject)
                        .then(returnedPerson => {
                            setPersons(persons.concat(returnedPerson))
                            setNewName("")
                            setNewNumber("")
                            showMessage(`User ${newName} has been added to the phonebook`)
                        })
                        .catch(error => {
                            return showMessage(`Failed to add number. More about error: ${error.response.data.error}`,false)
                        })
                        personService
                            .getAll()
                            .then(response => {
                                setPersons(response)
                            })
                            .catch( error => showMessage("Could not retrive data", false))
                }
            }
        }
    }

    const deletePersonOf = person => {
        if(window.confirm(`Delete ${person.name}?`))  {  
            personService
                .deletePerson(person.id)
                .then( () => {
                    setPersons(persons.filter(item => item.id !== person.id))
                    showMessage(`${person.name} has been removed`)
                })
               
            .catch( error => {
                showMessage(`Removal failed ${person.name} has already been removed`,false) 
                personService
                    .getAll()
                    .then( response => {
                        setPersons(response)
                    })
                    .catch(error => showMessage("Could not retrive data", false))
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

    const showMessage = (msg, successMsg = true) => {
        setMessage(msg)
        setSuccess(successMsg)

        setTimeout(() => {
            setMessage(null)
            setSuccess(null)
        },4000)
    }

    return(
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} success={success} />

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