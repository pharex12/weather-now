import { useState, useEffect } from "react";
import { getWeather } from "./weatherCodes";
import "./App.css";

// open-meteo urls. geocoding turns city name into lat/lon then we get the weather
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [place, setPlace] = useState(null);
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("weather_dark") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("weather_dark", dark);
  }, [dark]);

  // load a default city on first open
  useEffect(() => {
    fetchWeather("Lagos");
    // eslint-disable-next-line
  }, []);

  async function fetchWeather(city) {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const geoRes = await fetch(
        `${GEO_URL}?name=${encodeURIComponent(city)}&count=1`
      );
      const geo = await geoRes.json();
      if (!geo.results || geo.results.length === 0) {
        setError("Could not find that city. Try another name.");
        setData(null);
        setLoading(false);
        return;
      }
      const loc = geo.results[0];
      // console.log(loc) // was using this to check what the api sends back
      setPlace({
        name: loc.name,
        country: loc.country,
        admin: loc.admin1 || "",
      });

      const params = new URLSearchParams({
        latitude: loc.latitude,
        longitude: loc.longitude,
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
      });
      const wRes = await fetch(`${FORECAST_URL}?${params}`);
      const w = await wRes.json();
      setData(w);
    } catch (err) {
      console.log(err); // sometimes the api is slow and it fails
      setError("Something went wrong. Check your connection.");
    }
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchWeather(query);
  }

  const current = data?.current;
  const cw = current ? getWeather(current.weather_code) : null;

  const days = data?.daily
    ? data.daily.time.map((t, i) => ({
        date: t,
        code: data.daily.weather_code[i],
        max: Math.round(data.daily.temperature_2m_max[i]),
        min: Math.round(data.daily.temperature_2m_min[i]),
      }))
    : [];

  return (
    <div className={`app ${cw ? "bg-" + cw.day : ""}`}>
      <div className="container">
        <header>
          <h1>
            <span className="logo-icon">🌤️</span> Weather Now
          </h1>
          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            title="Toggle dark mode"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </header>

        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p className="status">Loading...</p>}
        {error && <p className="status error">{error}</p>}

        {!loading && current && place && (
          <>
            <section className="current-card">
              <div className="current-top">
                <div>
                  <h2 className="city">
                    {place.name}
                    {place.country ? `, ${place.country}` : ""}
                  </h2>
                  {place.admin && <p className="admin">{place.admin}</p>}
                  <p className="condition">{cw.label}</p>
                </div>
                <div className="big-icon">{cw.icon}</div>
              </div>

              <div className="temp">{Math.round(current.temperature_2m)}°C</div>

              <div className="details">
                <div className="detail">
                  <span className="d-label">Feels like</span>
                  <span className="d-value">
                    {Math.round(current.apparent_temperature)}°C
                  </span>
                </div>
                <div className="detail">
                  <span className="d-label">Humidity</span>
                  <span className="d-value">
                    {current.relative_humidity_2m}%
                  </span>
                </div>
                <div className="detail">
                  <span className="d-label">Wind</span>
                  <span className="d-value">
                    {Math.round(current.wind_speed_10m)} km/h
                  </span>
                </div>
              </div>
            </section>

            <section className="forecast">
              <h3>5-Day Forecast</h3>
              <div className="forecast-grid">
                {days.slice(0, 5).map((d, i) => {
                  const dw = getWeather(d.code);
                  const dayName =
                    i === 0
                      ? "Today"
                      : new Date(d.date).toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                  return (
                    <div className="day-card" key={d.date}>
                      <p className="day-name">{dayName}</p>
                      <div className="day-icon">{dw.icon}</div>
                      <p className="day-temp">
                        <strong>{d.max}°</strong>{" "}
                        <span className="day-min">{d.min}°</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        <footer className="foot">
          Data from Open-Meteo · built for fun
        </footer>
      </div>
    </div>
  );
}

export default App;
