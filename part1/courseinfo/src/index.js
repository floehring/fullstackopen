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
        <>
            <p>
                {props.content[0][0]} {props.content[0][1]}
            </p>
            <p>
                {props.content[1][0]} {props.content[1][1]}
            </p>
            <p>
                {props.content[2][0]} {props.content[2][1]}
            </p>
        </>)
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
            <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
