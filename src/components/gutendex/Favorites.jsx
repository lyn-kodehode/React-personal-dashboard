// import { useState, useEffect } from "react";
import { useShowResults } from "../../hooks/useShowResults";
import { useFavorites } from "../../hooks/useFavorites";
import BookDetails from "./BookDetails";
import styles from "../../styles/Favorites.module.css";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites } = useFavorites();
  const { selectedBookId, handleBookClick, handleBackToResults } =
    useShowResults();

  // Show book details if a book is selected
  if (selectedBookId) {
    return (
      <div className={styles.favoritesContainer}>
        <div className={styles.bookDetailsContainer}>
          <BookDetails bookId={selectedBookId} onBack={handleBackToResults} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.favoritesContainer}>
      {/* <h3>My Favorites</h3> */}

      {/* No favorites message */}
      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>
          No favorite books yet. Add some books to your favorites!
        </p>
      ) : (
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            {" "}
            <h4>
              You have {favorites.length} favorite book
              {favorites.length === 1 ? "" : "s"}
            </h4>
          </div>

          <div className={styles.bookList}>
            {favorites.map((book) => (
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
        </div>
      )}
      <Link
        to="/React-personal-dashboard/gutendex"
        className={styles.addMoreLink}
      >
        Add More Books
      </Link>
    </div>
  );
}
