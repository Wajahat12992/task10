# Skyline — Weather App

A responsive React weather app that lets you search any city and see live
temperature, condition, humidity and wind speed — with a backdrop that
shifts between day and night to match the searched city.

## Live demo & repo

- Live deployment: _add your Vercel/Netlify URL here after deploying_
- Repository: _add your GitHub URL here_

## Tech stack

- **React 18 + Vite** — fast dev server, no boilerplate config
- **Open-Meteo API** — free, no API key required, for both geocoding
  (city name → coordinates) and current weather
- Plain CSS (no framework) with CSS custom properties for theming

## Why Open-Meteo instead of OpenWeatherMap?

Open-Meteo needs no signup or API key, so anyone cloning this repo can run
it immediately. It's used here for both jobs:

1. **Geocoding** — `geocoding-api.open-meteo.com/v1/search?name=<city>`
   turns a free-text city name into latitude/longitude.
2. **Forecast** — `api.open-meteo.com/v1/forecast` returns current
   temperature, humidity, wind speed and a WMO weather code for those
   coordinates.

If you'd rather use OpenWeatherMap or WeatherAPI, only
`src/services/weatherApi.js` needs to change — every component consumes a
normalized `{ city, temperature, condition, icon, humidity, windSpeed, isDay }`
object, so swapping the data source doesn't touch the UI.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the printed local URL (usually http://localhost:5173)
```

To build for production:

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

## Deploying

**Vercel**
1. Push this folder to a GitHub repo.
2. Import the repo in Vercel — it auto-detects Vite (`npm run build`,
   output directory `dist`).
3. Deploy. No environment variables are required.

**Netlify**
1. Push to GitHub, then "Add new site → Import an existing project".
2. Build command: `npm run build`. Publish directory: `dist`.

## Project structure

```
src/
├── App.jsx                 # Top-level layout, wires state to UI
├── App.css                 # Visual design (tokens live in index.css)
├── index.css                # Global CSS variables & base styles
├── components/
│   ├── SearchBar.jsx        # Controlled input + submit
│   ├── WeatherCard.jsx      # Renders the fetched weather
│   ├── StatItem.jsx         # Reusable "icon + value + label" row
│   ├── Loader.jsx           # Loading state
│   └── ErrorMessage.jsx     # Error state (invalid city / network)
├── hooks/
│   └── useWeather.js        # All fetch state machine logic (idle/loading/success/error)
├── services/
│   └── weatherApi.js        # API calls + response normalization
└── utils/
    └── weatherCodes.js      # Maps WMO weather codes → label + icon
```

## Implementation notes (for the "explain your implementation" requirement)

- **State management**: `useWeather` is a custom hook that owns the fetch
  lifecycle (`idle → loading → success | error`) using `useState`. `App.jsx`
  only reads `status`, `weather`, and `errorMessage` from it — no prop
  drilling of fetch logic into child components.
- **API integration**: `weatherApi.js` does two sequential fetches
  (geocode, then forecast) and returns one normalized object so components
  never touch raw API shapes.
- **Error handling**: `WeatherApiError` distinguishes "city not found" from
  network/service failures, each surfaced with a clear message via
  `ErrorMessage`. Submitting an empty search is blocked client-side.
- **Component structure & reusability**: `StatItem` is reused for both
  humidity and wind speed so adding a new stat (e.g. "feels like") means
  one more `<StatItem />` line, not new markup.
- **Responsive design**: the layout is a single centered card with fluid
  padding and a mobile breakpoint (`@media (max-width: 420px)`) that
  stacks the search form and shrinks the temperature type scale.
- **UX detail**: `document.body` gets an `is-day` class driven by the
  API's `is_day` flag, so the backdrop gradient and the ambient star field
  reflect whether it's actually day or night in the searched city.

## Possible extensions

- Add a 5-day forecast strip using Open-Meteo's `daily` parameters.
- Persist the last-searched city in `localStorage`.
- Add unit toggle (°C / °F).
