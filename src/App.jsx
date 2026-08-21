import { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import { useWeather } from './hooks/useWeather'
import './App.css'

export default function App() {
  const { status, weather, errorMessage, search, isLoading, isError, isIdle } = useWeather()

  // Toggle a body class so the page backdrop matches day/night for the
  // last-searched city — a small ambient touch tied to real data.
  useEffect(() => {
    document.body.classList.toggle('is-day', Boolean(weather?.isDay))
  }, [weather])

  return (
    <div className="app">
      <div className="app__stars" aria-hidden="true" />

      <main className="app__panel">
        <header className="app__header">
          <p className="app__eyebrow">Current conditions</p>
          <h2 className="app__title">Skyline</h2>
        </header>

        <SearchBar onSearch={search} isLoading={isLoading} />

        <div className="app__result">
          {isIdle && (
            <p className="app__hint">Search any city to see live weather right now.</p>
          )}
          {isLoading && <Loader />}
          {isError && <ErrorMessage message={errorMessage} />}
          {status === 'success' && weather && <WeatherCard weather={weather} />}
        </div>
      </main>

      <footer className="app__footer">
        Data from{' '}
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>
      </footer>
    </div>
  )
}
