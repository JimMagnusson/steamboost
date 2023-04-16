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

// For 1b
const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text} </button>


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
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    setClicks({ ...clicks, left: clicks.left + 1})
  }

  const handleRightClick = () => 
  {
    setClicks({ ...clicks, right: clicks.right + 1})
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
export default App