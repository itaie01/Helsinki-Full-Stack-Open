import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Display = ({ text }) => <div>{text}</div>

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <Display text={text} /> 
      <Display text={value} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const calcAvg = () => (good * 1) + (neutral * 0) + (bad * -1) / (good + neutral + bad)
  const percPos = () => (good / (good + neutral + bad))

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <>
        <Header text="statistics"></Header>
        <table>
          <tbody>
            <tr>
              <th>good</th>
              <th>{good}</th>
            </tr>
            <tr>
              <th>neutral</th>
              <th>{neutral}</th>
            </tr>
            <tr>
              <th>bad</th>
              <th>{bad}</th>
            </tr>
            <tr>
              <th>average</th>
              <th>{calcAvg()}</th>
            </tr>
            <tr>
              <th>positive</th>
              <th>{percPos()} %</th>
            </tr>
          </tbody>
        </table>
        {/* <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <StatisticLine text="all" value={good + neutral + bad}></StatisticLine>
        <StatisticLine text="average" value={calcAvg()}></StatisticLine>
        <StatisticLine text="positive" value={percPos()}></StatisticLine> */}
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodVote = () => {
    setGood(good + 1)
    setNeutral(neutral)
    setBad(bad)
  }

  const neutralVote = () => {
    setGood(good)
    setNeutral(neutral + 1)
    setBad(bad)
  }

  const badVote = () => {
    setGood(good)
    setNeutral(neutral)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text="give feedback"></Header>
      <div>
        <Button onClick={goodVote} text="good"></Button>
        <Button onClick={neutralVote} text="neutral"></Button>
        <Button onClick={badVote} text="bad"></Button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App