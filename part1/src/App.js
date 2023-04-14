const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}


const App = () => {
 
  const friends = [
    {name: 'Peter', age: 44},
    {name: 'Maya', age: 30},
  ]
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name = 'Jim' age = {15 + 10}/>
      <Hello name = {friends[0].name} age = {friends[0].age}/>
      <Hello name = {friends[1].name} age = {friends[1].age}/>
    </div>
  )
}
export default App