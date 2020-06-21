import React from "react";
import Country from './Country'
import CountryDetail from "./CountryDetail";

const Countries = ({filterInput, countries}) => {

    let filtered = countries
        .filter(country => country.name.toLowerCase().includes(filterInput.toLowerCase()))


    if (filtered.length === 1) {
        // filter has only one result -> show details for result
        return <>
            {filtered.map(country => <CountryDetail key={country.name} country={country}/>)}
        </>
    } else if (filtered.length <= 10 || filtered.length === 0) {
        // filter has no more than 10 results -> show results
        return <>
            {filtered.map(country => <Country key={country.name} country={country}/>)}
        </>
    } else if (filtered.length > 10) {
        //filter has more than 10 results -> prompt for more input
        return <>Too many matches, specify another filter</>
    }

}

export default Countries
