import React, {useState} from 'react'
import Person from "./Person";


const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        console.log(event.target.value)
        event.preventDefault()

        const newPerson = {
            name: newName
        }

        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                {/*<div>debug: {newName}</div>*/}
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(p => <Person key={p.name} name={p.name}/>)}
        </div>
    )
}

export default App
