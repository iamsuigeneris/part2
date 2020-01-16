import React from 'react';
import ReactDOM from 'react-dom';

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
            <div key={eachCourse.id}> {<h2>{eachCourse.name}</h2>} {<Content parts={eachCourse.parts} />}</div>
    )
    
const App = () => {
    const course = [
            {
                name : 'Half Stack application development',
                id:1,
                parts: [
                {
                    name:'Fundamentals of React',
                    exercises: 10,
                    id:1
                },
                {
                    name:'Using props to pass data',
                    exercises: 7,
                    id:2
                },
                {
                    name:'State of a component',
                    exercises: 14,
                    id:3
                },
                {
                    name:'Redux',
                    exercises:11,
                    id:4
                }
            ]
        },
        {
            name:'Node.js',
            id: 2,
            parts: [
                {
                    name:'Routing',
                    exercises:3,
                    id:1
                },
                {
                    name:'Middlewares',
                    exercises:7,
                    id:2
                }
            ]
        }
    ]

    return (
            <div>
                <h1>Web development curriculum</h1>
                <Course course={course} /> 
            </div>
        ) 
}   

ReactDOM.render(<App />, document.getElementById('root'));

