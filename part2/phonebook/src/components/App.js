import React, {useState, useEffect} from 'react'
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from '../services/persons'
import Notification from "./Notification";

const SUCCESS = 'success'
const ERROR = 'error'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilter] = useState('')
    const [notificationMsg, setNotificationMsg] = useState(null)
    const [notificationType, setNotificationType] = useState(null)

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
        // console.log(event.target.value)
        setFilter(event.target.value)
    }

    const showNotification = (msg, type) => {
        setNotificationMsg(msg)
        setNotificationType(type)
        console.log(notificationType)
        setTimeout(() => {
            setNotificationMsg(null)
            setNotificationType(null)
        }, 5000)
    }

    const deletePerson = (id, name) => {
        const r = window.confirm(`Are you sure that you want to delete ${name}?`)

        if (r === true) {
            personService
                .remove(id)
                .then(_ => {
                    console.log(`removed person with id ${id}`)
                    setPersons(persons.filter(person => person.id !== id))
                    showNotification(`Deleted ${name}`, SUCCESS)
                })
                .catch(error => {
                    console.log(error)
                    showNotification(`Error removing ${name} from the phonebook`, ERROR)
                })
        }
    }

    const addPerson = (event) => {
        event.preventDefault()

        // Prevent action if fields are empty
        if (newName === '' || newNumber === '') {
            alert('Fields cannot be empty, please enter valid information')
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        // Search database for existing person
        const existingPerson = persons.find(person => person.name === newPerson.name)

        // Person does exist in database
        if (existingPerson !== undefined) {

            if (existingPerson.number === newPerson.number) {
                // Person has same name and same number, do nothing
                window.alert(`${newPerson.name} is already added to phonebook.`)
            } else {
                // Person has same name and different number, prompt for change
                const r = window.confirm(`${newPerson.name} is already added to phonebook, 
                would you like to replace the existing number?`)
                if (r === true) {
                    personService
                        .update(existingPerson.id, newPerson)
                        .then(data => {
                            setPersons(persons.map(p => p.id !== existingPerson.id ? p : data))
                            showNotification(`Updated ${newName}`, SUCCESS)
                        })
                        .catch(error => showNotification(error.response.data.error, ERROR))
                }
            }
        } else {
            // Person doesn't already exist in database
            personService
                .create(newPerson)
                .then(newPerson => {
                    console.log(`new person added: ${newPerson}`)
                    setPersons(persons.concat(newPerson))
                    showNotification(`Added ${newName}`, SUCCESS)
                })
                .catch(error => showNotification(error.response.data.error, ERROR))
        }
        setNewName('')
        setNewNumber('')
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMsg} type={notificationType}/>
            <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
            <h2>add a new Person</h2>
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
