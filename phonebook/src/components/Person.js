import React from 'react'

const Person = ({ person,deletePersonOf }) => {
    
    return(
        <div> <span>{person.name} </span>
              {person.number}
              <button onClick={deletePersonOf}>delete</button>
        </div>
    )
}

export default Person