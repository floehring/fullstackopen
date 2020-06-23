import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from "./Filter";
import Countries from './Countries'

const App = () => {

    const [filterInput, setFilterInput] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('received countries')
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilterInput(event.target.value)
    }

    // Filter countries to pass into Countries component
    const filtered = countries.filter(country => country.name.toLowerCase()
        .includes(filterInput.toLowerCase()))

    return (<>
        <Filter filterInput={filterInput} handleFilterChange={handleFilterChange}/>
        <Countries changeFilter={handleFilterChange} filtered={filtered}/>
    </>)
}

export default App
