import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
    let all = good + neutral + bad

    if (all > 0) {
        return (
            <div>
                <h1>statistics</h1>
                good {good} <br/>
                neutral {neutral} <br/>
                bad {bad} <br/>
                all {all} <br/>
                average {all / 3} <br/>
                positive {good / all * 100}%
            </div>
        )
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <h3>No feedback given</h3>
            </div>)
    }

}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)
