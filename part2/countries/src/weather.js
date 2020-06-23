import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY

const getWeatherFor = (city) => {
    const req = axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
    return req.then(res => res.data);
};

export default getWeatherFor
