import React from 'react'

const Filters = ({searchTerm,handleSearchChange}) => {
   
    return(
        <div>
            filter shown with <input value={searchTerm} onChange={handleSearchChange}/>
        </div>
    )
}

export default Filters