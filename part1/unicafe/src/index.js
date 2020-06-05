import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad

    if (all > 0) {
        return (
            <div>
                <table>
                    <tbody>
                    <Statistic value={good} text={'good'}/>
                    <Statistic value={neutral} text={'neutral'}/>
                    <Statistic value={bad} text={'bad'}/>
                    <Statistic value={all} text={'all'}/>
                    <Statistic value={all / 3} text={'average'}/>
                    <Statistic value={all === 0 ? 0 : `${good / all * 100} %`} text={'positive'}/>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <h3>No feedback given</h3>
            </div>)
    }

}

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>)
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text={'good'}/>
            <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
            <Button handleClick={() => setBad(bad + 1)} text={'bad'}/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)
