import React from "react"

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
    {props.course.parts.map(part =>
        <Part name = {part.name} exercises = {part.exercises} key = {part.id}></Part>
    )}
    </div>
)
}
const Part = (props) => {
return(
<div>
    <p>{props.name} {props.exercises}</p>
</div>
)
}
  
const Total = (props) => {
console.log(props)
const excercises = props.course.parts.map(part => part.exercises)
const tot = excercises.reduce((a, b) => {
    return a + b
})

return (
    <div>
    <b>total of {tot} excercises</b>
    </div>
)
}
  
const Course = (props) => {
return(
    <div>
    <Header course = {props.course}/>
    <Content course = {props.course}/>
    <Total course = {props.course}></Total>
    </div>

)
}

export default Course