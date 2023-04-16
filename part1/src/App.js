import { useState } from 'react'

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


const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text} </button>


const App = (props) => {
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
  
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  //console.log('rendering...', counter)

  return (
    <div>
      <Display counter={counter}/>
      <Button handleClick = {increaseByOne}
      text = 'plus'
      />
       <Button
        handleClick={setToZero}
        text='zero'
      />     
      <Button
        handleClick={decreaseByOne}
        text='minus'
        />    
    </div>
  )
}
export default App