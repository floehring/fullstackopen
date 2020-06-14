import React from "react";
import Person from "./Person";

const Persons = ({filterName, persons}) => {
    return <>{
        persons
            .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
            .map(p => <Person key={p.name} name={p.name} number={p.number}/>)
    }</>
}

export default Persons
