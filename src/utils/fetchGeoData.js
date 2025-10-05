export async function fetchGeoData(cityName) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} `);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("City not found");
    }

    //   retrieves the first match
    const { latitude, longitude, name } = data.results[0];

    return { latitude, longitude, name };
  } catch (error) {
    console.error("Failed to fetch geo data", error);
    // re-throw to let the calling component handle the error
    throw error;
  }
}
