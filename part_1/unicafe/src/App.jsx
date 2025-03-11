import { useState } from 'react'

const Button = (props) => 
  <button onClick={props.onClick}>
    {props.text}
  </button>

const StatisticLine = props => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = props => {
  if (props.total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.total} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positives} />
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positives, setPositives] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setAverage((updatedGood - bad) / (total + 1))
    setPositives((updatedGood / (total + 1)) * 100)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
    setAverage((good - updatedBad) / (total + 1))  
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGood}/>
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positives={positives} />
    </div>
  )
}

export default App