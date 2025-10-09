import { useEffect, useState } from "react";
import useFetch from "./useFetch";

export default function useNewsAPI() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newsCategory, setNewsCategory] = useState("");
  const [source, setSource] = useState("");
  const [sources, setSources] = useState([]);
  const [apiMode, setApiMode] = useState(""); // 'headlines', 'search', 'category'
  const [shouldFetch, setShouldFetch] = useState(false);

  //   Build API based on mode
  const buildApiUrl = () => {
    const baseUrl = "https://newsapi.org/v2";
    // const apiKey = "e19e8f7b0de54c3d8478d98e40f503a0";
    const apiKey = "e19e8f7b0de54c3d8478d98e40f503a0";

    switch (apiMode) {
      case "search":
        // Global search across all sources, categories etc >> data.articles
        return `${baseUrl}/everything?q=${searchQuery}&apiKey=${apiKey}&pageSize=10`;
      case "byCategory":
        // returns headlines per category in the US >> data.articles
        return `${baseUrl}/top-headlines?category=${newsCategory}&country=us&apiKey=${apiKey}&pageSize=10`;
      case "headlines":
        // returns list of headlines in the US in all categories >> data.articles
        return `${baseUrl}/top-headlines?country=us&apiKey=${apiKey}&pageSize=5`;
      case "sources":
        // returns list of sources per category in the US >> data.sources
        return `${baseUrl}/sources?category=${newsCategory}&country=us&apiKey=${apiKey}`;
      case "bySource":
        //returns all news per source >> data.articles
        return `${baseUrl}/top-headlines?sources=${source}&apiKey=${apiKey}`;
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

// ****************news per source
// https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=e19e8f7b0de54c3d8478d98e40f503a0
// https://newsapi.org/v2/everything?sources=${sourceId}&apiKey=e19e8f7b0de54c3d8478d98e40f503a0
