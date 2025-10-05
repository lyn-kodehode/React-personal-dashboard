export default async function handler(request, response) {
  // Add CORS headers
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  // 1. SECURITY CHECK - Only allow GET requests
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  // 2. EXTRACT PARAMETERS from the URL query string
  // Example: /api/news?category=technology&pageSize=5&country=us
  const {
    category = "technology",
    pageSize = 5,
    country = "us",
    language = "en",
    sortBy = "publishedAt",
    source = null,
    endpoint = "top-headlines",
  } = request.query;

  try {
    // Build URL with source parameter
    let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&language=${language}&sortBy=${sortBy}&apiKey=${process.env.API_KEY}&pageSize=${pageSize}`;

    // Add source if provided
    if (source) {
      newsApiUrl += `&sources=${source}`;
    }

    const apiResponse = await fetch(newsApiUrl);

    if (!apiResponse.ok) {
      throw new Error(`News API error: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    response.status(200).json(data);
  } catch (error) {
    console.error("News API Error:", error);
    response.status(500).json({ error: error.message });
  }
}
