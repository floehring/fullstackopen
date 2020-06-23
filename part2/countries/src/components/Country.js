import React from "react";

const Country = ({country, show}) => {
    return <li>{country.name}
        <button value={country.name} onClick={show}>Show</button>
        <br/></li>
}

export default Country
