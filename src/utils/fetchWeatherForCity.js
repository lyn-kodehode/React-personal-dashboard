// fetches weather date when latitude, longitude values are already available

export async function fetchWeatherForCity(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code,apparent_temperature`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} `);
    }

    // converts response to JSON
    const data = await response.json();

    // returns the current weather object
    return data.current;
  } catch (error) {
    console.error("Failed to fetch weather", error);
    // Re-throw to let the calling component handle the error
    throw error;
  }
}
