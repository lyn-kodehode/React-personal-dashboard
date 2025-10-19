import { useEffect, useState } from "react";
import useFetch from "./useFetch";

export default function useNewsAPI() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newsCategory, setNewsCategory] = useState("");
  const [source, setSource] = useState("");
  const [sources, setSources] = useState([]);
  const [apiMode, setApiMode] = useState(""); // 'headlines', 'search', 'category'
  const [shouldFetch, setShouldFetch] = useState(false);

  // Determine API URL based on environment
  const getApiBaseUrl = () => {
    // in development (localhost) but News wont work
    // if (import.meta.env.DEV) {
    //   return "http://localhost:5173/api/news";
    // }

    // in production works on GH-pages(deployed on Vercel)
    // also needs for localhost dev
    return "https://react-personal-dashboard-seven.vercel.app/api/news";

    // works on Vercel only not GH-pages
    // return "/api/news";
  };

  //   Build API based on mode
  const buildApiUrl = () => {
    // const baseUrl = "https://newsapi.org/v2";
    const baseUrl = getApiBaseUrl();

    switch (apiMode) {
      case "search":
        // Global search across all sources, categories etc >> data.articles
        // return `${baseUrl}/everything?q=${searchQuery}&pageSize=10`;
        return `${baseUrl}?mode=search&q=${searchQuery}&pageSize=10`;
      case "byCategory":
        // returns headlines per category in the US >> data.articles
        return `${baseUrl}?mode=byCategory&category=${newsCategory}&country=us&pageSize=10`;
      case "headlines":
        // returns list of headlines in the US in all categories >> data.articles
        return `${baseUrl}?mode=headlines&country=us&pageSize=5`;
      case "sources":
        // returns list of sources per category in the US >> data.sources
        return `${baseUrl}?mode=sources&category=${newsCategory}&country=us`;
      case "bySource":
        //returns all news per source >> data.articles
        return `${baseUrl}?mode=bySource&source=${source}`;
      default:
        return null;
    }
  };

  const { data, loading, error } = useFetch(shouldFetch ? buildApiUrl() : null);

  useEffect(() => {
    if (data && apiMode === "sources") {
      setSources(data.sources || []);
    }
    console.log("Data changed:", data); // ← Debug
    console.log("API mode:", apiMode); // ← Debug
  }, [data, apiMode]);

  const searchNews = (query) => {
    setSearchQuery(query);
    setApiMode("search");
    setShouldFetch(true);
  };

  const getHeadlines = () => {
    setApiMode("headlines");
    setShouldFetch(true);
  };

  const getSources = (category) => {
    setNewsCategory(category);
    setApiMode("sources");
    setShouldFetch(true);
  };

  const browseCategory = (category) => {
    setNewsCategory(category);
    setApiMode("byCategory");
    setShouldFetch(true);
  };

  const browseSource = (sourceId) => {
    setSource(sourceId);
    setApiMode("bySource");
    setShouldFetch(true);
  };

  return {
    data,
    error,
    loading,
    sources,
    searchQuery,
    setSearchQuery,
    searchNews,
    browseCategory,
    browseSource,
    getHeadlines,
    getSources,
  };
}
