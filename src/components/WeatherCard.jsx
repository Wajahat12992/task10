import StatItem from './StatItem'

export default function WeatherCard({ weather }) {
  const { city, region, temperature, condition, icon, humidity, windSpeed } = weather

  return (
    <section className="weather-card" aria-live="polite">
      <header className="weather-card__header">
        <div>
          <h1 className="weather-card__city">{city}</h1>
          {region && <p className="weather-card__region">{region}</p>}
        </div>
        <span className="weather-card__icon" aria-hidden="true">
          {icon}
        </span>
      </header>

      <div className="weather-card__temp">
        <span className="weather-card__temp-value">{temperature}°</span>
        <span className="weather-card__condition">{condition}</span>
      </div>

      <div className="weather-card__stats">
        <StatItem label="Humidity" value={`${humidity}%`} icon="💧" />
        <StatItem label="Wind speed" value={`${windSpeed} km/h`} icon="🌬️" />
      </div>
    </section>
  )
}
