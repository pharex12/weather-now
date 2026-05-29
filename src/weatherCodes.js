// WMO weather codes -> label + emoji icon
// reference: https://open-meteo.com/en/docs
export const weatherMap = {
  0: { label: "Clear sky", icon: "☀️", day: "clear" },
  1: { label: "Mainly clear", icon: "🌤️", day: "clear" },
  2: { label: "Partly cloudy", icon: "⛅", day: "cloud" },
  3: { label: "Overcast", icon: "☁️", day: "cloud" },
  45: { label: "Fog", icon: "🌫️", day: "cloud" },
  48: { label: "Rime fog", icon: "🌫️", day: "cloud" },
  51: { label: "Light drizzle", icon: "🌦️", day: "rain" },
  53: { label: "Drizzle", icon: "🌦️", day: "rain" },
  55: { label: "Heavy drizzle", icon: "🌧️", day: "rain" },
  56: { label: "Freezing drizzle", icon: "🌧️", day: "rain" },
  57: { label: "Freezing drizzle", icon: "🌧️", day: "rain" },
  61: { label: "Light rain", icon: "🌦️", day: "rain" },
  63: { label: "Rain", icon: "🌧️", day: "rain" },
  65: { label: "Heavy rain", icon: "🌧️", day: "rain" },
  66: { label: "Freezing rain", icon: "🌧️", day: "rain" },
  67: { label: "Freezing rain", icon: "🌧️", day: "rain" },
  71: { label: "Light snow", icon: "🌨️", day: "snow" },
  73: { label: "Snow", icon: "🌨️", day: "snow" },
  75: { label: "Heavy snow", icon: "❄️", day: "snow" },
  77: { label: "Snow grains", icon: "🌨️", day: "snow" },
  80: { label: "Rain showers", icon: "🌦️", day: "rain" },
  81: { label: "Rain showers", icon: "🌧️", day: "rain" },
  82: { label: "Heavy showers", icon: "⛈️", day: "rain" },
  85: { label: "Snow showers", icon: "🌨️", day: "snow" },
  86: { label: "Snow showers", icon: "❄️", day: "snow" },
  95: { label: "Thunderstorm", icon: "⛈️", day: "storm" },
  96: { label: "Thunderstorm + hail", icon: "⛈️", day: "storm" },
  99: { label: "Thunderstorm + hail", icon: "⛈️", day: "storm" },
};

export function getWeather(code) {
  return weatherMap[code] || { label: "Unknown", icon: "🌡️", day: "cloud" };
}
