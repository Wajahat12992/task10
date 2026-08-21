// Maps Open-Meteo's numeric WMO weather codes to a human-readable label
// and an icon glyph. Reference: https://open-meteo.com/en/docs (WMO Weather codes)
const WEATHER_CODE_MAP = {
  0: { label: 'Clear sky', icon: { day: '☀️', night: '🌕' } },
  1: { label: 'Mainly clear', icon: { day: '🌤️', night: '🌖' } },
  2: { label: 'Partly cloudy', icon: { day: '⛅', night: '☁️' } },
  3: { label: 'Overcast', icon: { day: '☁️', night: '☁️' } },
  45: { label: 'Fog', icon: { day: '🌫️', night: '🌫️' } },
  48: { label: 'Depositing rime fog', icon: { day: '🌫️', night: '🌫️' } },
  51: { label: 'Light drizzle', icon: { day: '🌦️', night: '🌧️' } },
  53: { label: 'Moderate drizzle', icon: { day: '🌦️', night: '🌧️' } },
  55: { label: 'Dense drizzle', icon: { day: '🌧️', night: '🌧️' } },
  56: { label: 'Light freezing drizzle', icon: { day: '🌧️', night: '🌧️' } },
  57: { label: 'Dense freezing drizzle', icon: { day: '🌧️', night: '🌧️' } },
  61: { label: 'Slight rain', icon: { day: '🌦️', night: '🌧️' } },
  63: { label: 'Moderate rain', icon: { day: '🌧️', night: '🌧️' } },
  65: { label: 'Heavy rain', icon: { day: '🌧️', night: '🌧️' } },
  66: { label: 'Light freezing rain', icon: { day: '🌧️', night: '🌧️' } },
  67: { label: 'Heavy freezing rain', icon: { day: '🌧️', night: '🌧️' } },
  71: { label: 'Slight snow fall', icon: { day: '🌨️', night: '🌨️' } },
  73: { label: 'Moderate snow fall', icon: { day: '🌨️', night: '🌨️' } },
  75: { label: 'Heavy snow fall', icon: { day: '❄️', night: '❄️' } },
  77: { label: 'Snow grains', icon: { day: '🌨️', night: '🌨️' } },
  80: { label: 'Slight rain showers', icon: { day: '🌦️', night: '🌧️' } },
  81: { label: 'Moderate rain showers', icon: { day: '🌧️', night: '🌧️' } },
  82: { label: 'Violent rain showers', icon: { day: '⛈️', night: '⛈️' } },
  85: { label: 'Slight snow showers', icon: { day: '🌨️', night: '🌨️' } },
  86: { label: 'Heavy snow showers', icon: { day: '❄️', night: '❄️' } },
  95: { label: 'Thunderstorm', icon: { day: '⛈️', night: '⛈️' } },
  96: { label: 'Thunderstorm, slight hail', icon: { day: '⛈️', night: '⛈️' } },
  99: { label: 'Thunderstorm, heavy hail', icon: { day: '⛈️', night: '⛈️' } },
}

export function describeWeatherCode(code, isDay = true) {
  const entry = WEATHER_CODE_MAP[code]
  if (!entry) {
    return { label: 'Unknown', icon: '❓' }
  }
  return { label: entry.label, icon: isDay ? entry.icon.day : entry.icon.night }
}
