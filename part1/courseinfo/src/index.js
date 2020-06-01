import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>)
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.content[0]}/>

            <Part part={props.content[1]}/>

            <Part part={props.content[2]}/>
        </div>)
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.exercises.reduce((a,b) => a + b)}</p>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course}/>
            <Content content={[part1, part2, part3]}/>
            <Total exercises={[part1, part2, part3].map((part) => part.exercises)}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
