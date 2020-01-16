import React from 'react'

/*Map through each subject*/
const Part = ({parts}) => parts.map(part => <p key={part.id}> {part.name} {part.exercises} </p>)   
/*Calculate the */
const Total = ({parts}) => {
    const initialValue = 0;
    const totalCourse = parts.reduce((acc,cur) => acc + cur.exercises, initialValue)
    return <strong>Number of exercises {totalCourse} </strong>   
}

/*Display both the subjects and total*/
const Content = ({parts}) => { 
    return(
        <div>
            <Part parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

/*Map through all the courses*/
const Course = ({course}) => course.map(
        eachCourse => 
            <div key={eachCourse.id}> 
                {<h2>{eachCourse.name}</h2>} 
                {<Content parts={eachCourse.parts} />}
            </div>
    )


export default Course    