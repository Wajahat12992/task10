import { useCallback, useState } from 'react'
import { getWeatherByCity } from '../services/weatherApi'

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

/**
 * Encapsulates all state + logic for searching a city's weather.
 * Keeping this out of the component tree makes it independently
 * testable and reusable (e.g. by a future "favorites" feature).
 */
export function useWeather() {
  const [status, setStatus] = useState(STATUS.IDLE)
  const [weather, setWeather] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const search = useCallback(async (city) => {
    setStatus(STATUS.LOADING)
    setErrorMessage('')
    try {
      const result = await getWeatherByCity(city)
      setWeather(result)
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      setWeather(null)
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
      setStatus(STATUS.ERROR)
    }
  }, [])

  const reset = useCallback(() => {
    setStatus(STATUS.IDLE)
    setWeather(null)
    setErrorMessage('')
  }, [])

  return {
    status,
    weather,
    errorMessage,
    search,
    reset,
    isLoading: status === STATUS.LOADING,
    isError: status === STATUS.ERROR,
    isIdle: status === STATUS.IDLE,
  }
}
