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
    },[])

    const handleFilterChange = (event) => {
        setFilterInput(event.target.value)
    }

    return (<>
        <Filter filterInput={filterInput} handleFilterChange={handleFilterChange}/>
        <Countries filterInput={filterInput} countries={countries}/>
    </>)
}

export default App
