// export default async function handler(request, response) {
//   response.setHeader("Access-Control-Allow-Origin", "*");
//   response.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   response.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );

//   if (request.method === "OPTIONS") {
//     response.status(200).end();
//     return;
//   }

//   response.status(200).json({ message: "CORS test successful" });
// }
export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (request.method === "OPTIONS") {
    response.status(200).end();
    return;
  }

  return response.status(200).json({
    status: "ok",
    totalResults: 3,
    articles: [
      {
        title: "Test News Article 1",
        description: "This is a test news article",
        url: "https://example.com/article1",
        urlToImage: "https://via.placeholder.com/300x200",
        publishedAt: "2025-01-05T17:30:00Z",
        source: { name: "Test News" },
      },
      // Add more test articles...
    ],
  });
}
