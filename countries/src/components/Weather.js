import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState("")

    const params = {
        access_key: 'REACT_APP_WEATHER_API_KEY',
        query:capital
      }

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                console.log('promise fulfilled')
                setWeather(response.data.current)
            })
    }, [capital])
      console.log(weather.current) 
    return(
        <div>
            <h2> Weather in {capital}</h2>
            <div><strong>temperature:</strong> {weather.temperature} Celsius</div>
            <img src={weather.weather_icons} width="100px" />
            <div><strong>wind:</strong> {weather.wind_speed}kph, <strong>direction:</strong> {weather.wind_dir}</div>
        </div>
    )

}

export default Weather