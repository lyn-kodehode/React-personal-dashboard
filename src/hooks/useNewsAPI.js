import { useState, useEffect } from "react";
import useFetch from "./useFetch";

export default function useNewsAPI() {
  const [searcgQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("technology");
  const [country, setCountry] = useState("us");
  const [source, setSource] = useState("");
  const [apiMode, setApiMode] = useState("headlines"); // 'headlines', 'search', 'category'

  //   Build API based on mode
  const buildApiUrl = () => {
    const baseUrl = "https://newsapi.org/v2";
    const apiKey = "e19e8f7b0de54c3d8478d98e40f503a0";

    switch (apiMode) {
      case "search":
        return `${baseUrl}/everything?q=${searchQuery}&apiKey=${apiKey}&pageSize=10`;
      case "category":
        return `${baseUrl}/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}&pageSize=10`;
      case "headlines":
      default:
        return `${baseUrl}/top-headlines?country=${country}&apiKey=${apiKey}&pageSize=5`;
    }
  };
}
