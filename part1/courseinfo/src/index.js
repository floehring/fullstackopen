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
            <Part part={props.content[0][0]} exercise={props.content[0][1]}/>

            <Part part={props.content[1][0]} exercise={props.content[1][1]}/>

            <Part part={props.content[2][0]} exercise={props.content[2][1]}/>
        </div>)
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {
                props.exercises[0]
                + props.exercises[1]
                + props.exercises[2]}</p>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.exercise}
            </p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content content={[
                [part1, exercises1],
                [part2, exercises2],
                [part3, exercises3]
            ]}/>
            <Total exercises={[
                exercises1,
                exercises2,
                exercises3]}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
