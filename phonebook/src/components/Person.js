import React from 'react'

const Person = ({ person,deletePersonOf }) => {
    
    return(
        <div> {person.name} 
              {person.number}
              <button onClick={deletePersonOf}>delete</button>
        </div>
    )
}

export default Person