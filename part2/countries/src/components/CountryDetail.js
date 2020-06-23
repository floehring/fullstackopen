import React, {useEffect, useState} from "react";
import getWeatherFor from "../weather";

const CountryDetail = ({country}) => {
    const [weatherData, setWeatherData] = useState()

    const city = country.name
    const capital = country.capital
    const population = country.population
    const languages = country.languages
    const flag = country.flag

    useEffect(() => {
        getWeatherFor(city).then(data => {
            console.log(data.current)
            setWeatherData(data.current)
        })
    }, [city])

    if (weatherData === undefined) {
        return <p>Waiting for data</p>
    } else {
        return <div>
            <h2>{city}</h2>
            <p>
                capital {capital} <br/>
                population {population}
            </p>
            <h4>languages</h4>
            <ul>
                {languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={flag} alt="country-flag" width="150px"/>
            <div>
                <h4>Weather in {country.capital}</h4>
                <b>temperature: </b>{weatherData.temperature} Celsius<br/>
                <img src={weatherData.weather_icons[0]} alt=""/><br/>
                <b>wind:</b>{weatherData.wind_speed} direction {weatherData.wind_dir}
            </div>
        </div>
    }

}

export default CountryDetail
