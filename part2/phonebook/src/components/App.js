import React, {useState} from 'react'
import Person from "./Person";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";


const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilter] = useState('')

    const handleNameChange = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        // console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        console.log(event.target.value)
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }

        if (persons.some(person => person.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
        }

        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson}
                        newName={newName} handleNameChange={handleNameChange}
                        newNumber={newNumber} handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons filterName={filterName} persons={persons}/>
        </div>
    )
}

export default App
