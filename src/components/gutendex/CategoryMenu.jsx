import { useGetBooksByCategory } from "../../hooks/useGetBooksByCategory";
import { useShowResults } from "../../hooks/useShowResults";
import BookDetails from "./BookDetails";
import styles from "../../styles/CategoryMenu.module.css";

export default function CategoryMenu() {
  const { selectedBookId, handleBookClick, handleBackToResults } =
    useShowResults();
  const {
    booksByCategory,
    loading,
    error,
    searchCategory,
    getCategoryItems,
    currentPage,
    totalCount,
    hasNext,
    hasPrevious,
    nextPage,
    previousPage,
  } = useGetBooksByCategory();

  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      getCategoryItems(selectedCategory, 1);
      handleBackToResults();
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
    <div className={styles.categoryContainer}>
      <h3>Browse by Category</h3>
      <select
        className={styles.categoryList}
        value={searchCategory}
        onChange={handleCategoryChange}
        disabled={loading}
      >
        <option value="">Select a category...</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {/* Book list - ADD THIS BACK */}
      {booksByCategory.length > 0 && (
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <h4>
              Found {totalCount} {searchCategory} books in (Page {currentPage}):
            </h4>
          </div>

          <div className={styles.bookList}>
            {booksByCategory.map((book) => (
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
    </div>
  );
}
