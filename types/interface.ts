export interface DataResults {
  name: string
  main: MainResults
  sys: SysResults
  weather: WeatherResults[]
  wind: windResults
}

interface MainResults {
  feels_like: number
  humidity: number
  temp: number
}

interface SysResults {
  country: string
}

interface WeatherResults {
  description: string
  icon: string
}

interface windResults {
  speed: number
}

export default DataResults
