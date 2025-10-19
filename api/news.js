export default async function handler(req, res) {
  // Enable CORS - allows React api to call this function
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  //   handle pre-flight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Get parameters from the query string
  const {
    mode,
    q,
    category,
    country = "us",
    source,
    pageSize = 10,
  } = req.query;

  // Get API key from environment variable (hidden on server)
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const baseUrl = "https://newsapi.org/v2";
  let apiUrl;

  try {
    // Build the NewsAPI URL based on the APImode
    switch (mode) {
      case "search":
        apiUrl = `${baseUrl}/everything?q=${encodeURIComponent(
          q
        )}&pageSize=${pageSize}`;
        break;
      case "byCategory":
        apiUrl = `${baseUrl}/top-headlines?category=${category}&country=us&pageSize=${pageSize}`;
        break;
      case "headlines":
        apiUrl = `${baseUrl}/top-headlines?country=${country}&pageSize=${pageSize}`;
        break;
      case "sources":
        apiUrl = `${baseUrl}/sources?category=${category}&country=${country}`;
        break;
      case "bySource":
        apiUrl = `${baseUrl}/top-headlines?sources=${source}`;
        break;
      default:
        return res.status(400).json({ error: "Invalid mode parameter" });
    }

    // Call NewsAPI with the API key
    const response = await fetch(apiUrl, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Return the news data
    return res.status(200).json(data);
  } catch (error) {
    console.error("NewsAPI error:", error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
