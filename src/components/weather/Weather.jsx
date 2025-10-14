import styles from "../../styles/Weather.module.css";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import CityCard from "./CityCard";
import { fetchWeatherForCityName } from "../../utils/fetchWeatherForCityName";
import { fetchWeatherForCity } from "../../utils/fetchWeatherForCity";

export default function Weather() {
  // controlled input for city search
  const [city, setCity] = useState("");
  //   persisting city objects in LocalStorage
  const [savedCities, setSavedCities] = useLocalStorage("savedCities", []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //   handles search form submission
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!city) return;

    try {
      // start loading
      setLoading(true);
      setError(null);

      // API request by cityName
      const newCity = await fetchWeatherForCityName(city);

      // adds city if not already in the list
      setSavedCities((prevSavedCities) => {
        if (
          prevSavedCities.some((savedCity) => savedCity.name === newCity.name)
        ) {
          return prevSavedCities;
        }

        return [...prevSavedCities, newCity];
      });

      //   clears city search input
      setCity("");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      window.alert(`Failed to fetch weather: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  //   updates weather for an existing city inthe list
  const updateWeatherForCity = async (city) => {
    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;

    console.log(
      `Checking city ${city.name}, lastUpdated: ${new Date(
        city.lastUpdated
      ).toLocaleString()}, ${Math.floor(
        (now - city.lastUpdated) / (1000 * 60)
      )} minutes ago`
    );

    // only updates if data fetched is older than 10mins
    if (!city.lastUpdated || now - city.lastUpdated > TEN_MINUTES) {
      try {
        const weatherData = await fetchWeatherForCity(
          city.latitude,
          city.longitude
        );

        return {
          ...city,
          weather: weatherData,
          lastUpdated: now,
        };
      } catch (error) {
        console.error(`Failed to update weather for ${city.name}:`, error);

        // if update fails, returns unchanged city
        return city;
      }
    }

    // no updates needed
    return city;
  };

  //   updates all cities individually
  const refreshAllCities = async () => {
    const updatedCities = [];

    for (let city of savedCities) {
      const updatedCity = await updateWeatherForCity(city);
      // pushed each updated City
      updatedCities.push(updatedCity);
    }

    // updatedcities array replaces savedCities
    setSavedCities(updatedCities);
    setLoading(false);
  };

  // initial refreshAllCities when page/cities load
  useEffect(() => {
    if (savedCities.length > 0) {
      refreshAllCities();
    }
  }, []);
  // }, [savedCities.length > 0]);

  // 15min auto-refresher
  useEffect(() => {
    // dont auto-refresh when no cities
    if (savedCities.length === 0) return;

    console.log(
      "Setting up auto-refresh timer for",
      savedCities.length,
      "cities"
    );

    const interval = setInterval(() => {
      refreshAllCities();
    }, 15 * 60 * 1000); //15mins in milliseconds

    return () => {
      clearInterval(interval);
    };
  }, [savedCities.length]);
  // }, [savedCities.length > 0]);

  //   removes city from savedCities list
  const handleRemove = (cityName) => {
    setSavedCities((prevSavedCities) =>
      prevSavedCities.filter((savedCity) => savedCity.name !== cityName)
    );
  };

  return (
    <div className={styles.weatherContainer}>
      {/* STATIC */}
      <form onSubmit={handleSearch}>
        <input
          type="search"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Enter City..."
          disabled={loading}
          className={styles.searchInput}
        />
        {loading && <p className={styles.loading}>Loading...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        {/* refresh button and city count */}
        {savedCities.length > 0 && (
          <div className={styles.controls}>
            <button
              type="button"
              onClick={refreshAllCities}
              disabled={loading}
              className={styles.refreshBtn}
            >
              Refresh All
            </button>
            <span className={styles.cityCount}>
              {savedCities.length} cit{savedCities.length === 1 ? "y" : "ies"}
            </span>
          </div>
        )}
      </form>

      {/* SCROLLABLE: results */}
      <div className={styles.resultsContainer}>
        {savedCities.map(({ name, weather, lastUpdated }) => (
          <CityCard
            key={name}
            name={name}
            temperature={weather.temperature_2m}
            isDay={weather.is_day}
            weatherCode={weather.weather_code}
            feelsLike={weather.apparent_temperature}
            lastUpdated={lastUpdated}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}

// ***********************************************
// ISSUES FOUND
// LastUpdated logs old timestamp
// updated: doesnt automatically display 5>10 mins unless browser reloads, but when component remounts, timer display will also -autorefresh
