import React from "react";

const CountryDetail = ({country}) => {
    const name = country.name
    const capital = country.capital
    const population = country.population
    const languages = country.languages
    const flag = country.flag

    return <div>
        <h2>{name}</h2>
        <p>
            capital {capital} <br/>
            population {population}
        </p>
        <h4>languages</h4>
        <ul>
            {languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={flag} alt="country-flag"/>
    </div>
}

export default CountryDetail
