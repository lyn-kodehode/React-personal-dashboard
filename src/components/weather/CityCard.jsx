import styles from "../../styles/CityCard.module.css";
import { useEffect, useState } from "react";
import {
  getWeatherCategory,
  getWeatherIcon,
  getWeatherDescription,
} from "../../utils/weatherCodes";

import { formatRelativeTime } from "../../utils/dateFormatter";

export default function CityCard({
  name,
  temperature,
  isDay,
  weatherCode,
  feelsLike,
  lastUpdated,
  onRemove,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // get weather info UI
  const weatherDescription = getWeatherDescription(weatherCode);
  const weatherIcon = getWeatherIcon(weatherCode, isDay);
  const weatherCategory = getWeatherCategory(weatherCode);

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <article
      className={`${styles.cityCardContainer} ${styles[weatherCategory]} `}
    >
      {/* Cityname = current temp */}
      <header className={styles.cardHeader}>
        <button
          className={styles.expandBtn}
          onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        >
          {isExpanded ? "-" : "+"}
        </button>
        <div className={styles.cityInfo}>
          {" "}
          <h3>{name}</h3>
          <div className={styles.temperatureSection}>
            <span className={styles.temperature}>
              {Math.round(temperature)}ºC
            </span>
            <span className={styles.weatherIcon}>{weatherIcon}</span>
          </div>
        </div>
      </header>
      {isExpanded && (
        <div className={styles.weatherInfo}>
          <p className={styles.weatherDescription}>{weatherDescription}</p>
          <p>Feels like {Math.round(feelsLike)}ºC</p>
          <p className={styles.timeOfDay}>
            <span className={styles.timeIcon}>{isDay ? "☀️" : "🌙 "}</span>
            {isDay ? "Day" : "Night"}
          </p>
          {/* 🌙 ☽*/}
          <p className={styles.lastUpdated}>
            Updated: {formatRelativeTime(lastUpdated)}
          </p>
        </div>
      )}
      <button
        className={styles.removeBtn}
        type="button"
        onClick={() => onRemove(name)}
      >
        Remove
      </button>
    </article>
  );
}
