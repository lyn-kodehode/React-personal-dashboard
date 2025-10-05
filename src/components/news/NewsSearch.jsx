import { useState } from "react";
import styles from "../../styles/NewsSearch.module.css";
import useFetch from "../../hooks/useFetch";

export default function NewsSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("technology");

  // Build API URL with parameters
  const apiUrl = `https://react-personal-dashboard-55q1oku23-lyns-projects-2db2e792.vercel.app/api/news?category=${category}&pageSize=5`;

  const { data, loading, error } = useFetch(apiUrl);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      // TODO: Add search functionality
      console.log("Searching for:", query);
    }
  };

  if (loading) return <div className={styles.loading}>Loading news...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.newsContainer}>
      <h3>Search News</h3>

      {/* Search form */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for news..."
          className={styles.searchInput}
        />
        <button type="submit" disabled={loading} className={styles.searchBtn}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {/* Category filter */}
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className={styles.categorySelect}
      >
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
      </select>

      {/* News results using NewsCard */}
      {data?.articles && (
        <div className={styles.newsList}>
          {data.articles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              url={article.url}
              description={article.description}
              content={article.content}
              source={article.source.name}
              publishedAt={article.publishedAt}
              imageUrl={article.urlToImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
