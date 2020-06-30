import React, {useState, useEffect} from 'react'
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from '../services/persons'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(persons => {
                console.log(`retrieved persons: ${persons}`)
                setPersons(persons);
            })
    }, [])

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

    const deletePerson = (id, name) => {
        const r = window.confirm(`Are you sure that you want to delete ${name}?`)

        if (r === true) {
            personService
                .remove(id)
                .then(_ => {
                    console.log(`removed person with id ${id}`)
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    const addPerson = (event) => {
        console.log(event.target.value)
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }

        personService
            .create(newPerson)
            .then(newPerson => {
                console.log(`new person added: ${newPerson}`)
                setPersons(persons.concat(newPerson))
            })

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
            <Persons filterName={filterName} persons={persons} onDelete={deletePerson}/>
        </div>
    )
}

export default App
