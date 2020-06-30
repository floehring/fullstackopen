import React from "react";
import Person from "./Person";

const Persons = ({filterName, persons, onDelete}) => {

    return <ul>{
        persons
            .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
            .map(p =>
                <Person key={p.id}
                        person={p}
                        onDelete={onDelete}/>)
    }</ul>
}

export default Persons
