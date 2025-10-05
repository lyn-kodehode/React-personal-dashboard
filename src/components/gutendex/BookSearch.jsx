import { useSearchBooks } from "../../hooks/useSearchBooks";
import { useState } from "react";
import styles from "../../styles/BookSearch.module.css";
import BookDetails from "./BookDetails";
import { useShowResults } from "../../hooks/useShowResults";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const { selectedBookId, handleBookClick, handleBackToResults } =
    useShowResults();
  const {
    books,
    loading,
    error,
    search,
    currentPage,
    totalCount,
    hasNext,
    hasPrevious,
    nextPage,
    previousPage,
  } = useSearchBooks();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      search(query, 1);
      handleBackToResults(); // Clear selected book on new search
    }
  };

  // Show book details if a book is selected
  if (selectedBookId) {
    return (
      <div className={styles.searchBooksContainer}>
        <BookDetails bookId={selectedBookId} onBack={handleBackToResults} />
      </div>
    );
  }

  return (
    <div className={styles.searchBooksContainer}>
      <h3>Search Books</h3>

      {/* Search form */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for books or authors..."
          className={styles.searchInput}
        />
        <button type="submit" disabled={loading} className={styles.searchBtn}>
          {loading ? "Searching..." : "Search"}
        </button>

        {/* Error display */}
        {error && <p className={styles.error}>Error: {error}</p>}

        {/* results */}
        {books.length > 0 && (
          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <h4>
                Found {totalCount} books (Page {currentPage}):
              </h4>
            </div>

            <div className={styles.bookList}>
              {books.map((book) => (
                <div
                  key={book.id}
                  className={styles.bookItem}
                  onClick={() => handleBookClick(book.id)}
                >
                  <h5>{book.title}</h5>
                  <p>Authors: {book.authors?.map((author) => author.name)}</p>
                </div>
              ))}
            </div>

            <div className={styles.pagination}>
              <button
                onClick={previousPage}
                disabled={!hasPrevious || loading}
                className={styles.pageBtn}
              >
                Previous
              </button>
              <span className={styles.pageInfo}>Page {currentPage}</span>
              <button
                onClick={nextPage}
                disabled={!hasNext || loading}
                className={styles.pageBtn}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
