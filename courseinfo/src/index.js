import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({course})  => <h1>{course.name}</h1>

const Part = ({course}) => <p>{course.name} {course.exercises} </p>
          
const Content = ({course}) => {   
    return (
        <div>
            <Part course={course.parts[0]} />   
            <Part course={course.parts[1]} /> 
            <Part course={course.parts[2]} />    
        </div>
    )
}

const Total = ({course}) => {
    const total = course.parts[0].exercises + course.parts[1].exercises  + course.parts[2].exercises + course.parts[3].exercises
    return(
        <strong>Number of exercises {total}</strong>
    )
}

const Course = ({course}) => {
    return(
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} /> 
        </div>
    )
}

const App = () => {
    const course = {
        name : 'Half Stack application development',
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
    }
    return( <Course course={course} /> )
              
}

ReactDOM.render(<App />, document.getElementById('root'));


