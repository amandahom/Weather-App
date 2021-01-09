import React, { useState } from 'react'
import DataResults from '../../types/interface'

async function getDetails(textInput: string) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=314c762603e28d1740cdcb0db478d25c&units=standard`,
      { mode: 'cors' },
    )
    const data = await response.json()
    console.log(data)
    return getWeather(data)
  } catch (err) {
    console.log(err)
  }
  return
}

function getWeather(data: DataResults) {
  const cityAndCountry = `${data['name']}, ${data['sys']['country']}`
  const description = `${data['weather'][0]['description']}`
  const temperature = `Feels like: ${data['main']['feels_like']}, Humidity: ${data['main']['humidity']}, Temp: ${data['main']['temp']}`
  const wind = parseInt(`${data['wind']['speed']}`)
  // console.log(cityAndCountry, description, temperature, wind)
  return { cityAndCountry, description, temperature, wind }
}

interface CityInformation {
  cityAndCountry: string
  description: string
  temperature: string
  wind: number
}

function Main() {
  const [cityInformation, setCityInformation] = useState<CityInformation>()
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const onSubmit = async (event: any) => {
    event.preventDefault()
    if (city) {
      let weather = await getDetails(city)
      setCityInformation(weather)
    } else {
      setError('ERROR: CITY IS REQUIRED')
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="icon-container">
          <canvas id="icon" width="100" height="100"></canvas>
        </div>
      </div>

      <div className="content">
        <div className="generalInfo">
          <div className="status"></div>
          <div className="location"></div>
        </div>
        {cityInformation && (
          <div className="detail-section">
            {cityInformation.cityAndCountry}
            {cityInformation.description}
            {cityInformation.temperature}
            {cityInformation.wind}
          </div>
        )}
        {/* Display city when typed
        <div>City: {city}</div> */}
        <input
          name="city"
          onChange={event => {
            setCity(event.target.value)
            if (event.target.value) {
              setError('')
            }
          }}
        />
        {error && <span>{error}</span>}

        <button type="button" onClick={onSubmit}>
          Submit!
        </button>
      </div>
    </div>
  )
}

export default Main
