import { useGetBookDetails } from "../../hooks/useGetBookDetails";
import { useEffect } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import styles from "../../styles/BookDetails.module.css";

export default function BookDetails({ bookId, onBack }) {
  const { bookDetails, loading, error, getDetails } = useGetBookDetails();
  const { toggleFavorite, isFavorited } = useFavorites();

  // Get details when component mounts or bookId changes
  useEffect(() => {
    if (bookId) {
      getDetails(bookId);
    }
  }, [bookId]);

  // const isBookFavorited = bookDetails
  //   ? favorites.some((favoriteBook) => favoriteBook.id === bookDetails.id)
  //   : false;

  return (
    <div>
      <button onClick={onBack} className={styles.backBtn}>
        ← Back to List
      </button>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {bookDetails && (
        <div className={styles.bookDetails}>
          <h3>{bookDetails.title}</h3>
          {bookDetails.formats && (
            <img
              className={styles.bookImage}
              src={bookDetails.formats["image/jpeg"]}
              alt={`${bookDetails.title}'s book cover`}
            />
          )}
          <div className={styles.bookInfo}>
            {bookDetails.authors && (
              <p>
                <strong>Authors:</strong>{" "}
                {bookDetails.authors.map((author) => author.name)}
              </p>
            )}
            {bookDetails.download_count && (
              <p>
                <strong>Downloads: </strong>
                {bookDetails.download_count}
              </p>
            )}
            {bookDetails.bookshelves && (
              <p>
                <strong>
                  Categor{bookDetails.bookshelves.length > 1 ? "ies: " : "y:"}
                </strong>
                {bookDetails.bookshelves
                  .map((category) => category.replace(/^Category: /, ""))
                  .join(", ")}
              </p>
            )}
            {bookDetails.languages && (
              <p>
                <strong>Language:</strong>{" "}
                {bookDetails.languages
                  .map((lang) => (lang === "en" ? "English" : "Non-English"))
                  .join(", ")}
              </p>
            )}
          </div>
          {bookDetails.formats && (
            <p>
              <a
                href={bookDetails.formats["text/plain; charset=us-ascii"]}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {/* {bookDetails.formats["text/plain; charset=us-ascii"]} */}
                📖 Read Online
              </a>
            </p>
          )}
          {bookDetails.id && (
            <button
              onClick={() => toggleFavorite(bookDetails)}
              className={styles.favoriteBtn}
            >
              {isFavorited(bookDetails.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
