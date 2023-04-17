import React from "react"
const Filter = (props) => {
    return(
    <form onSubmit = {props.addPerson}>
        <div> filter shown with: <input 
            value={props.filter} 
            onChange={props.handleFilterChange}/>
        </div>
    </form>
    )
}



export default Filter