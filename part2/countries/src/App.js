import React, {useState, useEffect} from 'react'
import Filter from "./components/Filter";
import Countries from './components/Countries'
import getAllCountries from "./countries";

const App = () => {

    const [filterInput, setFilterInput] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        getAllCountries().then(data => {
            setCountries(data)
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
