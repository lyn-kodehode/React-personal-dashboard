// calls fetchGeoData to get geolocation
// then fetched weather data based on city name

import { fetchGeoData } from "./fetchGeoData";
import { fetchWeatherForCity } from "./fetchWeatherForCity";

export async function fetchWeatherForCityName(cityName) {
  try {
    // fetch geoData first
    const geoData = await fetchGeoData(cityName);

    // then fetch weather data
    const weatherData = await fetchWeatherForCity(
      geoData.latitude,
      geoData.longitude
    );

    return {
      ...geoData,
      weather: weatherData,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error(`Failed to fetch weather for ${cityName}`, error);
    throw error;
  }
}
