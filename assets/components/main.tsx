import React, { useState } from 'react'
import DataResults from '../../types/interface'
import styles from '../../styles/Main.module.css'
import { FaSearch } from 'react-icons/fa'

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

  async function getDetails(city: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=314c762603e28d1740cdcb0db478d25c&units=standard`,
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
    const cityAndCountry: string = `${data['name']}, ${data['sys']['country']}`
    const description: string = `${data['weather'][0]['description']}`
    const feelsLike: number = parseInt(`${data['main']['feels_like']} `)
    const humidity: number = parseInt(`${data['main']['humidity']}`)
    const temperature: number = parseInt(`${data['main']['temp']}`)
    const wind: number = parseInt(`${data['wind']['speed']}`)
    const icon: string = `http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`

    // Convert to degrees
    const feelsLikeCelsius: number = Math.round(feelsLike - 273.15)
    const temperatureCelsius: number = Math.round(temperature - 273.15)
    const feelsLikeFahrenheit: number = Math.round((feelsLikeCelsius * 9) / 5) + 32
    const temperatureFahrenheit: number = Math.round((temperatureCelsius * 9) / 5) + 32

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
    <div className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>
      <div className="icon-container">
        {cityInformation && (
          <div className={styles.icon}>
            <img src={cityInformation.icon} alt="weather icon" width={100} height={100} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        {cityInformation && <div className={styles.cityAndCountry}>{cityInformation.cityAndCountry}</div>}
        {cityInformation && <div className={styles.cityDescription}>{cityInformation.description}</div>}

        {tempInformation && (
          <div className="cityTempDetails">
            <div className={styles.cityTemp}>
              <span className={styles.tempNumber}>
                {click ? tempInformation.temperatureCelsius : tempInformation.temperatureFahrenheit}
              </span>
              <span className={styles.degreeSym}> {click ? 'C' : 'F'}</span>
            </div>
            <div className={styles.flexGrid}>
              <div className={styles.col}>
                <div className={styles.cityFeels}>
                  <span className={styles.tempFeelsLike}>
                    <label className={styles.label}>Feels Like: </label>
                    {click ? tempInformation.feelsLikeCelsius : tempInformation.feelsLikeFahrenheit}
                  </span>
                  <span className={styles.degreeSym}> {click ? 'C' : 'F'}</span>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.cityHumidity}>
                  <label className={styles.label}>Humidity: </label>
                  {tempInformation.humidity}%
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.cityWind}>
                  <label className={styles.label}>Wind:</label> {tempInformation.wind} mph
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Display city when typed
        <div>City: {city}</div> */}
      </div>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchBox}
          name="city"
          placeholder="Enter the name of a city."
          onChange={event => {
            setCity(event.target.value)
            if (event.target.value) {
              setError('')
            } else {
            }
          }}
        />
        <button type="button" onClick={onSubmit} className={styles.searchButton}>
          <FaSearch className={styles.reactIcon} />
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.degreeChange}>
        <button type="button" onClick={handleClick} className={styles.degreeButton}>
          {click ? 'C' : 'F'}
        </button>
      </div>
    </div>
  )
}

export default Main
