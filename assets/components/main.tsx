import React, { useState } from 'react'
import DataResults from '../../types/interface'

function Main() {
  const [cityInformation, setCityInformation] = useState<CityInformationInterface>()
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [tempInformation, setTempInformation] = useState<CityTempInterface>()
  const [click, setClick] = useState(false)

  const onSubmit = async (event: any) => {
    event.preventDefault()
    if (city) {
      let weather = await getDetails(city)
      setCityInformation(weather)
      setTempInformation(weather)
    } else {
      setError('A city is required. Please try again.')
    }
  }

  const handleClick = async (event: any) => {
    event.preventDefault()
    if (tempInformation) {
      setClick(!click)
    }
  }

  async function getDetails(textInput: string) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=314c762603e28d1740cdcb0db478d25c&units=standard`,
        { mode: 'cors' },
      )
      const data = await response.json()
      //   console.log(data)
      return getWeather(data)
    } catch (err) {
      console.log(err)
      setError('Cannot find city. Please try again.')
    }
    return
  }

  function getWeather(data: DataResults) {
    const cityAndCountry = `${data['name']}, ${data['sys']['country']}`
    const description = `${data['weather'][0]['description']}`
    const feelsLike: number = parseInt(`${data['main']['feels_like']} `)
    const humidity: number = parseInt(`${data['main']['humidity']}`)
    const temperature: number = parseInt(`${data['main']['temp']}`)
    const wind: number = parseInt(`${data['wind']['speed']}`)
    const icon = `http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`
    console.log(icon)

    // Convert to degrees
    const feelsLikeCelsius = Math.round(feelsLike - 273.15)
    const temperatureCelsius = Math.round(temperature - 273.15)
    const feelsLikeFahrenheit = Math.round((feelsLikeCelsius * 9) / 5) + 32
    const temperatureFahrenheit = Math.round((temperatureCelsius * 9) / 5) + 32

    return {
      cityAndCountry,
      description,
      feelsLikeCelsius,
      temperatureCelsius,
      feelsLikeFahrenheit,
      temperatureFahrenheit,
      humidity,
      wind,
      icon,
    }
  }

  interface CityInformationInterface {
    cityAndCountry: string
    description: string
    icon: string
  }

  interface CityTempInterface {
    feelsLikeCelsius: number
    temperatureCelsius: number
    feelsLikeFahrenheit: number
    temperatureFahrenheit: number
    humidity: number
    wind: number
  }

  return (
    <div className="container">
      <div className="header">
        <div className="icon-container">
          {cityInformation && (
            <div className="icon">
              <img src={cityInformation.icon} alt="weather icon" width={100} height={100} />
            </div>
          )}
        </div>
      </div>

      <div className="content">
        <div className="generalInfo">
          <div className="status"></div>
          <div className="location"></div>
        </div>
        {cityInformation && (
          <div className="cityDetails">
            {cityInformation.cityAndCountry}
            {cityInformation.description}
          </div>
        )}
        {tempInformation && (
          <div className="cityTempDetails">
            Temperature: {click ? tempInformation.temperatureFahrenheit : tempInformation.temperatureCelsius}
            {click ? 'F' : 'C'}
            Feels Like: {click ? tempInformation.feelsLikeFahrenheit : tempInformation.feelsLikeCelsius}
            {click ? 'F' : 'C'}
            Humidity: {tempInformation.humidity}% Wind: {tempInformation.wind} mph
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
        <button type="button" onClick={handleClick}>
          {click ? 'F' : 'C'}
        </button>
      </div>
    </div>
  )
}

export default Main
