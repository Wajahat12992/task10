import { describeWeatherCode } from '../utils/weatherCodes'

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * Custom error class so the UI layer can distinguish "city not found"
 * from network/server failures and show the right message.
 */
export class WeatherApiError extends Error {
  constructor(message, type = 'generic') {
    super(message)
    this.name = 'WeatherApiError'
    this.type = type // 'not-found' | 'network' | 'generic'
  }
}

/**
 * Resolves a free-text city name into coordinates + display name.
 */
async function geocodeCity(city) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  let response
  try {
    response = await fetch(url)
  } catch {
    throw new WeatherApiError('Could not reach the weather service. Check your connection.', 'network')
  }

  if (!response.ok) {
    throw new WeatherApiError('The weather service is unavailable right now.', 'network')
  }

  const data = await response.json()
  if (!data.results || data.results.length === 0) {
    throw new WeatherApiError(`We couldn't find a city called "${city}".`, 'not-found')
  }

  const { latitude, longitude, name, country, admin1 } = data.results[0]
  return { latitude, longitude, name, country, admin1 }
}

/**
 * Fetches current weather for a set of coordinates.
 */
async function fetchCurrentConditions(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day',
    timezone: 'auto',
  })

  let response
  try {
    response = await fetch(`${FORECAST_URL}?${params.toString()}`)
  } catch {
    throw new WeatherApiError('Could not reach the weather service. Check your connection.', 'network')
  }

  if (!response.ok) {
    throw new WeatherApiError('The weather service is unavailable right now.', 'network')
  }

  return response.json()
}

/**
 * Public API: given a city name, returns a normalized weather object
 * ready for the UI to render.
 */
export async function getWeatherByCity(city) {
  const trimmed = city.trim()
  if (!trimmed) {
    throw new WeatherApiError('Enter a city name to search.', 'not-found')
  }

  const location = await geocodeCity(trimmed)
  const forecast = await fetchCurrentConditions(location.latitude, location.longitude)
  const current = forecast.current

  const isDay = current.is_day === 1
  const { label, icon } = describeWeatherCode(current.weather_code, isDay)

  return {
    city: location.name,
    region: [location.admin1, location.country].filter(Boolean).join(', '),
    temperature: Math.round(current.temperature_2m),
    condition: label,
    icon,
    humidity: Math.round(current.relative_humidity_2m),
    windSpeed: Math.round(current.wind_speed_10m),
    isDay,
  }
}
