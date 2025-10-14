import styles from "../../styles/NewsSearch.module.css";
import NewsCard from "./NewsCard";
import useNewsAPI from "../../hooks/useNewsAPI";

export default function NewsSearch() {
  const { data, loading, error, searchNews, searchQuery, setSearchQuery } =
    useNewsAPI();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      searchNews(searchQuery);
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
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search for news..."
          className={styles.searchInput}
        />
        <button type="submit" disabled={loading} className={styles.searchBtn}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* News results using NewsCard */}
      {data?.articles && (
        <div className={styles.newsList}>
          {data.articles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}

      {/* No results message */}
      {data?.articles && data.articles.length === 0 && (
        <div className={styles.noResults}>
          No articles found for "{searchQuery}". Try a different search term.
        </div>
      )}
    </div>
  );
}
