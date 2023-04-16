import { useState } from 'react'

// For 1a
const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part = {props.course.parts[0].name} exercises = {props.course.parts[0].exercises}></Part>
      <Part part = {props.course.parts[1].name} exercises = {props.course.parts[1].exercises}></Part>
      <Part part = {props.course.parts[2].name} exercises = {props.course.parts[2].exercises}></Part>
    </div>
  )
}

const Part = (props) => {
  return(
  <div>
    <p>{props.part} {props.exercises}</p>
  </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
  )
}



const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

// For 1c
const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text} </button>

// For 1d
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Statistics = (props) => {
  console.log(props)
  if(props.good + props.neutral + props.bad > 0) {
    return(
      <div>
        <StastisticLine text ="good" value = {props.good}></StastisticLine>
        <StastisticLine text ="neutral" value = {props.neutral}></StastisticLine>
        <StastisticLine text ="neutral" value = {props.bad}></StastisticLine>
        <StastisticLine text ="bad" value = {props.all}></StastisticLine>
        <StastisticLine text ="average" value = {props.average}></StastisticLine>
        <StastisticLine text ="positive" value = {props.positive * 100 + ' %'}></StastisticLine>
      </div>
      )
  }
  else {
    return (
      <div>
      <p>No feedback given</p>
    </div>
    )
  }
}

const StastisticLine = (props) => {
  return(
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const App = (props) => {

  // For 1a
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const name = 'Peter'
  const age = 10
  
  // 1c Component state
  /*const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)
  */

  // 1d More complex state
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRigth = right + 1
    setRight(updatedRigth)
    setTotal(left + updatedRigth)
  }
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodReview = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralReview = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadReview = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  const getReviewCount = () => good + neutral + bad
  
  const getAverage = () => (good - bad)/getReviewCount()

  const getPositivePercentage = () => good/getReviewCount()

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={handleGoodReview} text="good" />
      <Button handleClick={handleNeutralReview} text="neutral" />
      <Button handleClick={handleBadReview} text="bad" />
      <h1> 
        statistics
      </h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {getReviewCount()} average = {getAverage()} positive = {getPositivePercentage()}></Statistics>
      
    </div>
  )
}
export default App