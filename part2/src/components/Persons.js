import React from "react"
const Persons = (props) => {
    return(
    <div>
        {props.persons.map(person =>
            <div key = {person.id}>
                {person.name} {person.number}
                <button onClick={(event) => props.removePerson(person.id, event)}> delete
                </button>
            </div>
        )}
    </div>
    )
}



export default Persons