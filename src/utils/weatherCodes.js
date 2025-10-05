// Weather code to description mapping
export const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export const getWeatherDescription = (weatherCode) => {
  return weatherDescriptions[weatherCode] || "Unknown weather";
};

// Weather code to icon mapping (using emoji for simplicity)
export const weatherIcons = {
  0: { day: "☀️", night: "🌙" },
  1: { day: "🌤️", night: "☁️" },
  2: { day: "⛅", night: "☁️" },
  3: { day: "☁️", night: "☁️" },
  45: { day: "🌫️", night: "🌫️" },
  48: { day: "🌫️", night: "🌫️" },
  51: { day: "🌦️", night: "🌧️" },
  53: { day: "🌦️", night: "🌧️" },
  55: { day: "🌧️", night: "🌧️" },
  56: { day: "🌨️", night: "🌨️" },
  57: { day: "🌨️", night: "🌨️" },
  61: { day: "🌦️", night: "🌧️" },
  63: { day: "🌧️", night: "🌧️" },
  65: { day: "🌧️", night: "🌧️" },
  66: { day: "🌨️", night: "🌨️" },
  67: { day: "🌨️", night: "🌨️" },
  71: { day: "🌨️", night: "🌨️" },
  73: { day: "🌨️", night: "🌨️" },
  75: { day: "🌨️", night: "🌨️" },
  77: { day: "🌨️", night: "🌨️" },
  80: { day: "🌦️", night: "🌧️" },
  81: { day: "🌧️", night: "🌧️" },
  82: { day: "⛈️", night: "⛈️" },
  85: { day: "🌨️", night: "🌨️" },
  86: { day: "🌨️", night: "🌨️" },
  95: { day: "⛈️", night: "⛈️" },
  96: { day: "⛈️", night: "⛈️" },
  99: { day: "⛈️", night: "⛈️" },
};

export const getWeatherIcon = (weatherCode, isDay) => {
  const iconSet = weatherIcons[weatherCode];
  if (!iconSet) return "?";

  return isDay ? iconSet.day : iconSet.night;
};

export const getWeatherCategory = (weatherCode) => {
  if (weatherCode === 0) return "clear";
  if ([1, 2, 3].includes(weatherCode)) return "cloudy";
  if ([45, 48].includes(weatherCode)) return "foggy";
  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  )
    return "rainy";
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "snowy";
  if ([95, 96, 99].includes(weatherCode)) return "stormy";
  return "unknown";
};
